import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type {
  View,
  Event,
  EventPropGetter,
  SlotInfo,
  NavigateAction,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled, { createGlobalStyle } from "styled-components";
import { vw } from "../utils/pxstyle";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - react-big-calendar가 TimeGrid 타입을 제공하지 않음
import TimeGridModule from "react-big-calendar/lib/TimeGrid";

const localizer = momentLocalizer(moment);

// 리소스가 있는 이벤트 타입 확장
interface ResourceEvent extends Event {
  resourceId?: number;
  groupId?: string;
}

// 4개의 방(리소스) 정의
const resources = [
  { resourceId: 1, resourceTitle: "Lecture room" },
  { resourceId: 2, resourceTitle: "Tissue Lab 1" },
  { resourceId: 3, resourceTitle: "Tissue Lab 2" },
  { resourceId: 4, resourceTitle: "Tissue Lab 3" },
];

const THREE_DAY_RANGE = 3;

type TimeGridProps = Record<string, unknown>;

const TimeGrid =
  ((TimeGridModule as { default?: ComponentType<TimeGridProps> }).default ??
    (TimeGridModule as ComponentType<TimeGridProps>));

const getThreeDayRange = (date: Date) => {
  const start = localizer.startOf(date, "day");
  return Array.from({ length: THREE_DAY_RANGE }, (_, index) =>
    localizer.add(start, index, "day")
  );
};

type ThreeDayComponent = ComponentType<TimeGridProps> & {
  range: (date: Date) => Date[];
  navigate: (date: Date, action: NavigateAction) => Date;
  title: (date: Date) => string;
};

const ThreeDayView: ThreeDayComponent = (
  props: TimeGridProps & { date?: Date }
) => {
  const { date, ...restProps } = props;
  const range = getThreeDayRange(date ?? new Date());
  return <TimeGrid {...restProps} range={range} eventOffset={15} />;
};

ThreeDayView.range = (date: Date) => getThreeDayRange(date);

ThreeDayView.navigate = (date: Date, action: NavigateAction) => {
  switch (action) {
    case "PREV":
      return localizer.add(date, -THREE_DAY_RANGE, "day");
    case "NEXT":
      return localizer.add(date, THREE_DAY_RANGE, "day");
    case "TODAY":
      return new Date();
    case "DATE":
    default:
      return date;
  }
};

ThreeDayView.title = (date: Date) => {
  const range = getThreeDayRange(date);
  const start = range[0];
  const end = range[range.length - 1];
  return `${moment(start).format("YYYY년 M월 D일")} - ${moment(
    end
  ).format("YYYY년 M월 D일")}`;
};

// 일정 리스트 생성 함수
const createEvents = (): ResourceEvent[] => {
  const today = new Date();
  const events: ResourceEvent[] = [];

  // 오늘 날짜 기준으로 일정 생성
  const currentDay = new Date(today);
  currentDay.setHours(0, 0, 0, 0);

  // 모든 시간대 일정 정의 (tissueLab으로 지정된 resource에만 표시)
  const timeSlots = [
    {
      hour: 10,
      duration: 2,
      title: "특별 강의",
      user: "홍길동",
      tissueLab: 1, // Lecture room에 표시
    }, // 10:00-12:00
    {
      hour: 14,
      duration: 1,
      title: "Event",
      user: "홍길동",
      tissueLab: 2, // Tissue Lab 1에 표시
    }, // 14:00-15:00
    {
      hour: 18,
      duration: 2,
      title: "Event Name",
      user: "홍길동",
      tissueLab: 3, // Tissue Lab 2에 표시
    }, // 18:00-20:00
    {
      hour: 10,
      duration: 2,
      title: "특별 강의",
      user: "홍길동",
      tissueLab: 4, // Lecture room에 표시
    },
  ];

  // 각 resource에 대해 일정 추가
  resources.forEach((resource) => {
    timeSlots.forEach((slot) => {
      // tissueLab이 현재 resource의 resourceId와 일치할 때만 이벤트 생성
      if (slot.tissueLab === resource.resourceId) {
        // 일반 이벤트는 그룹으로 묶지 않음 (groupId 없음)
        const start = new Date(currentDay);
        start.setHours(slot.hour, 0, 0, 0);

        const end = new Date(start);
        end.setHours(start.getHours() + slot.duration);

        events.push({
          start,
          end,
          title: `${slot.tissueLab}\n${slot.title}`,
          resourceId: resource.resourceId,
          // groupId 없음 - 일반 이벤트는 그룹으로 묶이지 않음
        });
      }
    });
  });

  // 테스트용: 여러 리소스를 동시에 사용하는 이벤트 생성
  const multiResourceSlots = [
    {
      hour: 12,
      duration: 1,
      title: "공동 실험",
      resourceIds: [2, 3],
    },
  ];

  multiResourceSlots.forEach((slot) => {
    const groupId = `${slot.title}-${slot.hour}`;
    slot.resourceIds.forEach((resourceId) => {
      const start = new Date(currentDay);
      start.setHours(slot.hour, 0, 0, 0);

      const end = new Date(start);
      end.setHours(start.getHours() + slot.duration);

      events.push({
        start,
        end,
        title: `${resourceId}\n${slot.title}`,
        resourceId,
        groupId,
      });
    });
  });

  return events;
};

function CalendarFour() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("week");
  const [events] = useState<ResourceEvent[]>(createEvents());
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  // 초기 로딩 완료 여부 (무한 루프 방지용)
  const [isInitialized, setIsInitialized] = useState(false);
  const initializationTimeoutRef = useRef<number | null>(null);

  // 초기 로딩 완료 처리 (DOM 안정화 대기)
  useEffect(() => {
    // 짧은 지연 후 초기화 완료로 표시 (DOM 렌더링 완료 대기)
    initializationTimeoutRef.current = window.setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => {
      if (initializationTimeoutRef.current !== null) {
        window.clearTimeout(initializationTimeoutRef.current);
      }
    };
  }, []);

  // day 뷰에서만 resource 사용
  const isResourceView = currentView === "day";
  const isTimeGridView = currentView === "day" || currentView === "week";

  // 뷰별로 다른 이벤트 스타일 커스터마이징
  // className만 반환하여 CSS로 스타일링 (무한 루프 방지)
  // useCallback으로 메모이제이션하여 불필요한 재렌더링 방지
  const eventStyleGetter: EventPropGetter<ResourceEvent> = useCallback(
    (event: ResourceEvent) => {
      const isSpecial = event.title?.toString().includes("특별");
      const isMonthView = currentView === "month";
      const isSelected = selectedGroupId && event.groupId === selectedGroupId;

      // className만 반환하고 CSS로 스타일링
      let className = "";
      if (isSpecial) {
        className += " rbc-event-special";
      }
      if (isMonthView) {
        className += " rbc-event-month";
      } else {
        className += " rbc-event-time";
      }
      if (isSelected) {
        className += " rbc-event-selected";
      }

      return {
        className: className.trim(),
        // style 객체 제거 (완전히 CSS로 처리)
      };
    },
    [currentView, selectedGroupId]
  );

  // 날짜 포맷도 메모이제이션
  const formats = useMemo(
    () => ({
      dayFormat: "ddd M/D",
      weekdayFormat: "ddd",
      monthHeaderFormat: "YYYY년 M월",
      dayHeaderFormat: "YYYY년 M월 D일 dddd",
      dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format("M/D")} - ${moment(end).format("M/D")}`,
      timeGutterFormat: "HH:mm",
    }),
    []
  );

  // 메시지도 메모이제이션
  const messages = useMemo(
    () => ({
      next: ">",
      previous: "<",
      today: "오늘",
      month: "월",
      week: "주",
      day: "일",
    }),
    []
  );

  // 이벤트 핸들러 메모이제이션
  const handleSelectEvent = useCallback((event: ResourceEvent) => {
    // groupId가 있는 경우에만 그룹 선택 (다중 리소스 이벤트)
    if (event.groupId) {
      setSelectedGroupId(event.groupId);
    } else {
      // 일반 이벤트는 그룹 선택하지 않음
      setSelectedGroupId(null);
    }
    console.log("이벤트 선택:", event);
  }, []);

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setSelectedGroupId(null);
      console.log("슬롯 선택:", slotInfo);
    },
    [setSelectedGroupId]
  );

  // min/max 시간을 메모이제이션
  const minTime = useMemo(
    () => (isTimeGridView ? new Date(2025, 0, 1, 10, 0, 0) : undefined),
    [isTimeGridView]
  );
  const maxTime = useMemo(
    () => (isTimeGridView ? new Date(2025, 0, 1, 22, 0, 0) : undefined),
    [isTimeGridView]
  );

  // 일간 뷰에서 헤더 제거를 위한 빈 컴포넌트
  const EmptyHeader = () => null;

  // 뷰별 컴포넌트 설정
  const components = useMemo(
    () => ({
      day: {
        header: currentView === "day" ? EmptyHeader : undefined,
      },
      header: currentView === "day" ? EmptyHeader : undefined,
    }),
    [currentView]
  );

  const views = useMemo(
    () => ({
      month: true,
      week: ThreeDayView,
      day: true,
    }),
    []
  );

  return (
    <>
      <CalendarGlobalStyles />
      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          timeslots={1}
          endAccessor="end"
          resourceIdAccessor={isResourceView ? "resourceId" : undefined}
          resourceTitleAccessor={isResourceView ? "resourceTitle" : undefined}
          resources={isResourceView ? resources : undefined}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          date={currentDate}
          view={currentView}
          onNavigate={(date) => setCurrentDate(date)}
          onView={(view) => setCurrentView(view)}
          views={views}
          defaultView="week"
          toolbar={true}
          min={minTime}
          max={maxTime}
          // 이벤트 스타일 커스터마이징 (CSS로 처리)
          eventPropGetter={eventStyleGetter}
          // 날짜 포맷 커스터마이징
          formats={formats}
          messages={messages}
          // 시간 슬롯 간격 (분 단위) - 1시간 단위로 설정
          step={60}
          // 이벤트 클릭 핸들러
          onSelectEvent={handleSelectEvent}
          // 슬롯 클릭 핸들러 (새 이벤트 생성 가능)
          onSelectSlot={handleSelectSlot}
          selectable
          // 무한 루프 방지: 초기 로딩 시에만 비활성화
          popup={!isInitialized ? false : undefined}
          // 무한 루프 방지: 레이아웃 알고리즘 고정
          dayLayoutAlgorithm="no-overlap"
          // 무한 루프 방지: 초기 로딩 시에만 "더 보기" 기능 비활성화
          onShowMore={!isInitialized ? undefined : undefined}
          // 무한 루프 방지: 초기 로딩 시에만 월간 뷰 최대 행 수 제한 (measureRowLimit 방지)
          allDayMaxRows={!isInitialized ? 5 : undefined}
          // 일간 뷰에서 헤더 제거
          components={components}
        />
      </CalendarWrapper>
    </>
  );
}

export default CalendarFour;

const CalendarWrapper = styled.div`
  width: 100%;
  width: 100vw;
  margin: 20px;
  padding: 10px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const CalendarGlobalStyles = createGlobalStyle`
  #root {
    width: 100vw;
    min-height: 100vh;
    overflow: auto;
  }

  /* 기본 이벤트 */
  .rbc-event {
    background-color: #ffff;
    border-color: #9e9e9e;
    color: #141414;
    border-radius: 4px;
  }

  /* 특별 이벤트 */
  .rbc-event-special {
    background-color: #ffff !important;
    border-color: #c92016 !important;
    color: #141414;
  }

  .rbc-event-month {
    padding: ${vw(2)} ${vw(4)};   
    font-size: ${vw(12)};
    min-height: ${vw(16)};
  }

  .rbc-event-time {
    padding: ${vw(4)} ${vw(6)};
    font-size: ${vw(12)};
    min-height: ${vw(20)};
    border-left: ${vw(4)} solid;
  }

  .rbc-event-time:not(.rbc-event-special) {
    border-left-color: #9e9e9e;
    border-left-width: ${vw(12)};
  }

  .rbc-event-time.rbc-event-special {
    border-left-color: #c92016;
    border-left-width: ${vw(12)};
  }

  .rbc-event-selected {
    box-shadow: 0 0 0 ${vw(2)} #1976d2 inset;
  }

  .rbc-time-view .rbc-time-view-resources,
  .rbc-time-view .rbc-resource-header,
  .rbc-time-view .rbc-day-slot,
  .rbc-time-view .rbc-resource {
    min-width: ${vw(67)} !important;
  }

  .rbc-time-view .rbc-resource-header {
    font-size: 10px;
    padding: ${vw(2)} ${vw(1)};
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: ${vw(28)};
    max-height: ${vw(28)};
    overflow: hidden;
  }

  .rbc-time-view .rbc-header {
    font-size: ${vw(10)};
    padding: ${vw(4)} ${vw(2)};
    text-align: center;
    line-height: 1.2;
    min-height: ${vw(28)};
    max-height: ${vw(28)};
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rbc-time-view .rbc-time-header {
    min-height: ${vw(28)};
  }

  .rbc-time-view .rbc-time-header-content {
    min-height: ${vw(28)};
  }

  .rbc-button-link.rbc-show-more,
  .rbc-month-view .rbc-show-more {
    display: none !important;
  }

  .rbc-month-view .rbc-row-segment {
    pointer-events: none;
  }

  .rbc-month-view .rbc-day-bg {
    pointer-events: auto;
  }

  .rbc-time-view .rbc-time-header-gutter {
    max-width: auto;
  }

  .rbc-time-view .rbc-row.rbc-row-resource {
    max-width:auto;
  }

  .rbc-toolbar {
    display: flex !important;
    visibility: visible !important;
    height: auto !important;
    min-height: ${vw(40)} !important;
    padding: ${vw(8)} ${vw(4)};
    margin-bottom: 8px;
  }

  .rbc-toolbar button {
    font-size: ${vw(10)};
    padding: ${vw(4)} ${vw(8)};
    margin: 0 2px;
  }

  .rbc-toolbar-label {
    font-size: ${vw(12)};
    font-weight: 500;
    padding: 0 ${vw(8)};
  }

  .rbc-time-header {
    display: flex !important;
    visibility: visible !important;
    border-bottom: 1px solid #ddd;
  }

  .rbc-time-header-content {
    display: flex !important;
    visibility: visible !important;
    width: ${vw(288)};
    min-height: ${vw(40)};
  }

  .rbc-time-view:not(.rbc-day-view) .rbc-time-header-content > .rbc-header {
    flex: 1;
    border-right: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${vw(8)} ${vw(4)};
    font-size: 12px;
  }

  .rbc-time-view:not(.rbc-day-view) .rbc-time-header-content > .rbc-header:last-child {
    border-right: none;
  }

  .rbc-day-view .rbc-time-header-content > .rbc-header,
  .rbc-day-view .rbc-time-header-content,
  .rbc-day-view .rbc-row,
  .rbc-day-view .rbc-row.rbc-row-resource {
    display: none !important;
  }

  .rbc-time-header-gutter {
    min-width: ${vw(60)};
    border-right: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${vw(8)} ${vw(4)};
  }

  .rbc-timeslot-group {
    width: ${vw(60)} !important;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    padding: 0 ${vw(4)};
    box-sizing: border-box;
  }

  /* 헤더의 2개로 나뉘던 영역 보이지 않기 */
  .rbc-allday-cell{
  display: none;
  }

  .rbc-time-content{
    border: none;
}
`;

