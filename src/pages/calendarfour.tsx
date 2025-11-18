import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type {
  View,
  Event,
  EventPropGetter,
  SlotInfo,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../CalendarApi.css";

const localizer = momentLocalizer(moment);

// 리소스가 있는 이벤트 타입 확장
interface ResourceEvent extends Event {
  resourceId?: number;
}

// 4개의 방(리소스) 정의
const resources = [
  { resourceId: 1, resourceTitle: "Lecture room" },
  { resourceId: 2, resourceTitle: "Tissue Lab 1" },
  { resourceId: 3, resourceTitle: "Tissue Lab 2" },
  { resourceId: 4, resourceTitle: "Tissue Lab 3" },
];

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
        const start = new Date(currentDay);
        start.setHours(slot.hour, 0, 0, 0);

        const end = new Date(start);
        end.setHours(start.getHours() + slot.duration);

        events.push({
          start,
          end,
          title: `${slot.tissueLab}\n${slot.title}`,
          resourceId: resource.resourceId,
        });
      }
    });
  });

  return events;
};

function CalendarFour() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");
  const [events] = useState<ResourceEvent[]>(createEvents());
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

  // day/week 뷰에서만 resource 사용
  const isResourceView = currentView === "day" || currentView === "week";

  // 뷰별로 다른 이벤트 스타일 커스터마이징
  // className만 반환하여 CSS로 스타일링 (무한 루프 방지)
  // useCallback으로 메모이제이션하여 불필요한 재렌더링 방지
  const eventStyleGetter: EventPropGetter<ResourceEvent> = useCallback(
    (event: ResourceEvent) => {
      const isSpecial = event.title?.toString().includes("특별");
      const isMonthView = currentView === "month";

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

      return {
        className: className.trim(),
        // style 객체 제거 (완전히 CSS로 처리)
      };
    },
    [currentView]
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
    console.log("이벤트 선택:", event);
  }, []);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log("슬롯 선택:", slotInfo);
  }, []);

  // min/max 시간을 메모이제이션
  const minTime = useMemo(
    () => (isResourceView ? new Date(2025, 0, 1, 10, 0, 0) : undefined),
    [isResourceView]
  );
  const maxTime = useMemo(
    () => (isResourceView ? new Date(2025, 0, 1, 22, 0, 0) : undefined),
    [isResourceView]
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

  return (
    <div
      className="calendar-container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
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
        views={["month", "week", "day"]}
        defaultView="month"
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
    </div>
  );
}

export default CalendarFour;
