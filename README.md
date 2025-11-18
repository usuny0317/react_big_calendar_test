# Calendar4 - React Big Calendar 예제

React Big Calendar를 사용한 캘린더 애플리케이션입니다.

## 📦 사용 기술

- React 19
- TypeScript
- Vite
- react-big-calendar
- moment.js

## 🚀 시작하기

```bash
npm install
npm run dev
```

## 📚 React Big Calendar 제공 기능

### 1. 뷰 (Views)

- **월간 뷰 (Month)**: 전체 월 달력 보기
- **주간 뷰 (Week)**: 주 단위 시간표 보기
- **일간 뷰 (Day)**: 하루 단위 시간표 보기
- **작업주 뷰 (Work Week)**: 평일만 표시하는 주간 뷰
- **일정 뷰 (Agenda)**: 리스트 형태로 일정 보기

### 2. 리소스 (Resources) - 다중 컬럼 지원

- 여러 리소스(방, 강의실 등)를 컬럼으로 표시
- 각 리소스별로 일정 관리
- `resourceId`, `resourceTitle`로 리소스 식별

### 3. 이벤트 관리

- **이벤트 표시**: 시작/종료 시간, 제목, 설명 등
- **이벤트 스타일링**: `eventPropGetter`로 개별 이벤트 스타일 커스터마이징
- **이벤트 선택**: `onSelectEvent`로 이벤트 클릭 처리
- **이벤트 더블클릭**: `onDoubleClickEvent`로 이벤트 더블클릭 처리
- **이벤트 드래그**: `handleDragStart`로 드래그 앤 드롭 지원

### 4. 날짜/시간 포맷 커스터마이징

- `formats` prop으로 모든 날짜/시간 표시 형식 커스터마이징
  - `dateFormat`: 월간 뷰 날짜 형식
  - `dayFormat`: 주/일간 뷰 날짜 형식
  - `weekdayFormat`: 요일 형식
  - `timeGutterFormat`: 시간 슬롯 형식
  - `monthHeaderFormat`: 월간 뷰 헤더 형식
  - `dayHeaderFormat`: 일간 뷰 헤더 형식
  - `dayRangeHeaderFormat`: 주간 뷰 헤더 형식
  - `agendaHeaderFormat`: 일정 뷰 헤더 형식
  - `eventTimeRangeFormat`: 이벤트 시간 범위 형식

### 5. 슬롯 선택 (Slot Selection)

- `selectable`: 슬롯 선택 활성화
- `onSelectSlot`: 빈 시간대 클릭/드래그 시 호출
- `onSelecting`: 선택 중인 범위 검증
- 새 이벤트 생성에 활용 가능

### 6. 네비게이션

- **날짜 이동**: `onNavigate`로 날짜 변경 처리
- **뷰 전환**: `onView`로 뷰 변경 처리
- **기본 날짜/뷰**: `defaultDate`, `defaultView` 설정
- **드릴다운**: `onDrillDown`으로 날짜 클릭 시 상세 뷰로 이동

### 7. 시간 범위 설정

- `min`: 표시할 최소 시간
- `max`: 표시할 최대 시간
- `scrollToTime`: 초기 스크롤 위치
- `enableAutoScroll`: 자동 스크롤 활성화

### 8. 스타일 커스터마이징

- **이벤트 스타일**: `eventPropGetter` - 이벤트별 스타일
- **슬롯 스타일**: `slotPropGetter` - 시간 슬롯 스타일
- **날짜 스타일**: `dayPropGetter` - 날짜 셀 스타일
- **컴포넌트 커스터마이징**: `components` prop으로 모든 컴포넌트 교체 가능
  - `toolbar`: 상단 툴바
  - `event`: 이벤트 컴포넌트
  - `eventWrapper`: 이벤트 래퍼
  - `header`: 헤더 컴포넌트
  - `dateCellWrapper`: 날짜 셀 래퍼
  - `timeSlotWrapper`: 시간 슬롯 래퍼
  - 등등...

### 9. 다국어 지원

- `messages`: 모든 텍스트 메시지 커스터마이징
  - `next`, `previous`, `today`
  - `month`, `week`, `day`, `agenda`
  - `showMore`, `noEventsInRange`
- `culture`: 로케일 설정

### 10. 이벤트 접근자 (Accessors)

- `titleAccessor`: 이벤트 제목 접근
- `startAccessor`: 시작 시간 접근
- `endAccessor`: 종료 시간 접근
- `allDayAccessor`: 종일 이벤트 여부
- `tooltipAccessor`: 툴팁 텍스트
- `resourceAccessor`: 리소스 접근

### 11. 리소스 접근자

- `resourceIdAccessor`: 리소스 ID 접근
- `resourceTitleAccessor`: 리소스 제목 접근
- `resourceGroupingLayout`: 리소스 그룹화 레이아웃

### 12. 고급 기능

- **배경 이벤트**: `backgroundEvents`로 배경 이벤트 표시
- **다중 일정 표시**: `showAllEvents`로 모든 일정 표시
- **팝업**: `popup`으로 이벤트 상세 정보 팝업
- **RTL 지원**: `rtl`로 오른쪽에서 왼쪽 레이아웃
- **시간 슬롯**: `timeslots`로 시간 슬롯 분할
- **스텝**: `step`으로 시간 간격 설정
- **일정 레이아웃 알고리즘**: `dayLayoutAlgorithm`으로 일정 배치 방식 선택
  - `overlap`: 겹침 허용
  - `no-overlap`: 겹침 방지
- **범위 변경 감지**: `onRangeChange`로 표시 범위 변경 감지

### 13. 이벤트 핸들러

- `onSelectEvent`: 이벤트 선택
- `onDoubleClickEvent`: 이벤트 더블클릭
- `onKeyPressEvent`: 키보드 이벤트
- `onSelectSlot`: 슬롯 선택
- `onNavigate`: 날짜 네비게이션
- `onView`: 뷰 변경
- `onDrillDown`: 날짜 클릭
- `onShowMore`: "더 보기" 클릭
- `onRangeChange`: 표시 범위 변경

### 14. 로컬라이저 (Localizer)

- `momentLocalizer`: moment.js 사용
- `globalizeLocalizer`: Globalize.js 사용
- 날짜 포맷, 요일, 월 이름 등 로케일 처리

## 📝 현재 구현된 기능

- ✅ 월/주/일 뷰 전환
- ✅ 4개 리소스(방) 컬럼 표시
- ✅ 이벤트 스타일 커스터마이징
- ✅ 날짜/시간 포맷 한국어 설정
- ✅ 이벤트 클릭 핸들러
- ✅ 슬롯 선택 기능
- ✅ 반응형 디자인 (vw 단위 사용)

## 🔧 커스터마이징 예제

### 이벤트 스타일 커스터마이징

```typescript
const eventStyleGetter: EventPropGetter<ResourceEvent> = (event) => {
  return {
    style: {
      backgroundColor: "#3174ad",
      borderColor: "#265985",
      borderLeft: "4px solid #265985",
    },
  };
};
```

### 날짜 포맷 커스터마이징

```typescript
formats={{
  monthHeaderFormat: "YYYY년 M월",
  dayHeaderFormat: "YYYY년 M월 D일 dddd",
  timeGutterFormat: "HH:mm",
}}
```

### 컴포넌트 커스터마이징

```typescript
components={{
  toolbar: CustomToolbar,
  event: CustomEvent,
  header: CustomHeader,
}}
```

## 📋 Calendar Props 전체 정리

### 필수 Props

| Prop | Type | 설명 | 예시 |
|------|------|------|------|
| `localizer` | `DateLocalizer` | 날짜 포맷팅을 위한 로컬라이저 (필수) | `momentLocalizer(moment)` |
| `events` | `TEvent[]` | 표시할 이벤트 배열 | `[{ start, end, title }]` |

### 이벤트 데이터 접근자 (Accessors)

| Prop | Type | 설명 | 기본값 |
|------|------|------|--------|
| `startAccessor` | `string \| function` | 이벤트 시작 시간 접근자 | `"start"` |
| `endAccessor` | `string \| function` | 이벤트 종료 시간 접근자 | `"end"` |
| `titleAccessor` | `string \| function` | 이벤트 제목 접근자 | `"title"` |
| `allDayAccessor` | `string \| function` | 종일 이벤트 여부 접근자 | `"allDay"` |
| `tooltipAccessor` | `string \| function \| null` | 툴팁 텍스트 접근자 | `null` |
| `resourceAccessor` | `string \| function` | 리소스 접근자 | - |

### 리소스 관련 Props

| Prop | Type | 설명 | 예시 |
|------|------|------|------|
| `resources` | `TResource[]` | 리소스 배열 (방, 강의실 등) | `[{ resourceId, resourceTitle }]` |
| `resourceIdAccessor` | `string \| function` | 리소스 ID 접근자 | `"resourceId"` |
| `resourceTitleAccessor` | `string \| function` | 리소스 제목 접근자 | `"resourceTitle"` |
| `resourceGroupingLayout` | `string` | 리소스 그룹화 레이아웃 | - |

### 뷰 관련 Props

| Prop | Type | 설명 | 기본값 |
|------|------|------|--------|
| `view` | `View` | 현재 뷰 | `"month"` |
| `views` | `View[] \| object` | 사용 가능한 뷰 목록 | `["month", "week", "day"]` |
| `defaultView` | `View` | 기본 뷰 | `"month"` |
| `date` | `Date` | 현재 표시 날짜 | `new Date()` |
| `defaultDate` | `Date` | 기본 날짜 | `new Date()` |

### 이벤트 핸들러 Props

| Prop | Type | 설명 | 파라미터 |
|------|------|------|----------|
| `onSelectEvent` | `function` | 이벤트 클릭 핸들러 | `(event, e) => void` |
| `onDoubleClickEvent` | `function` | 이벤트 더블클릭 핸들러 | `(event, e) => void` |
| `onKeyPressEvent` | `function` | 이벤트 키보드 이벤트 핸들러 | `(event, e) => void` |
| `onSelectSlot` | `function` | 슬롯 선택 핸들러 | `(slotInfo) => void` |
| `onSelecting` | `function` | 슬롯 선택 중 검증 | `(range) => boolean` |
| `onNavigate` | `function` | 날짜 네비게이션 핸들러 | `(date, view, action) => void` |
| `onView` | `function` | 뷰 변경 핸들러 | `(view) => void` |
| `onDrillDown` | `function` | 날짜 클릭 핸들러 | `(date, view) => void` |
| `onShowMore` | `function` | "더 보기" 클릭 핸들러 | `(events, date) => void` |
| `onRangeChange` | `function` | 표시 범위 변경 핸들러 | `(range, view) => void` |
| `handleDragStart` | `function` | 드래그 시작 핸들러 | `(event) => void` |

### 스타일 커스터마이징 Props

| Prop | Type | 설명 | 반환값 |
|------|------|------|--------|
| `eventPropGetter` | `function` | 이벤트 스타일/클래스 설정 | `{ className?, style? }` |
| `slotPropGetter` | `function` | 시간 슬롯 스타일/클래스 설정 | `{ className?, style? }` |
| `dayPropGetter` | `function` | 날짜 셀 스타일/클래스 설정 | `{ className?, style? }` |
| `slotGroupPropGetter` | `function` | 슬롯 그룹 스타일/클래스 설정 | `{ className?, style? }` |
| `style` | `object` | 캘린더 컨테이너 스타일 | `React.CSSProperties` |

### 시간 범위 Props

| Prop | Type | 설명 | 예시 |
|------|------|------|------|
| `min` | `Date` | 표시할 최소 시간 | `new Date(2025, 0, 1, 9, 0)` |
| `max` | `Date` | 표시할 최대 시간 | `new Date(2025, 0, 1, 22, 0)` |
| `scrollToTime` | `Date` | 초기 스크롤 위치 | `new Date(2025, 0, 1, 9, 0)` |
| `enableAutoScroll` | `boolean` | 자동 스크롤 활성화 | `true` |

### 포맷 관련 Props

| Prop | Type | 설명 | 예시 |
|------|------|------|------|
| `formats` | `Formats` | 날짜/시간 포맷 설정 | `{ dayFormat: "ddd M/D" }` |
| `messages` | `Messages` | 텍스트 메시지 커스터마이징 | `{ next: ">", today: "오늘" }` |
| `culture` | `string` | 로케일 설정 | `"ko"` |

### 슬롯 선택 Props

| Prop | Type | 설명 | 기본값 |
|------|------|------|--------|
| `selectable` | `boolean \| "ignoreEvents"` | 슬롯 선택 활성화 | `false` |
| `longPressThreshold` | `number` | 롱프레스 임계값 (ms) | `250` |

### 시간 슬롯 Props

| Prop | Type | 설명 | 기본값 |
|------|------|------|--------|
| `step` | `number` | 시간 간격 (분) | `30` |
| `timeslots` | `number` | 시간 슬롯 분할 수 | `2` |

### 레이아웃 Props

| Prop | Type | 설명 | 옵션 |
|------|------|------|------|
| `dayLayoutAlgorithm` | `string \| function` | 일정 레이아웃 알고리즘 | `"overlap"`, `"no-overlap"` |
| `showAllEvents` | `boolean` | 모든 이벤트 표시 | `false` |
| `allDayMaxRows` | `number` | 종일 이벤트 최대 행 수 | - |
| `showMultiDayTimes` | `boolean` | 멀티데이 시간 표시 | `false` |

### 컴포넌트 커스터마이징 Props

| Prop | Type | 설명 | 예시 |
|------|------|------|------|
| `components` | `Components` | 커스텀 컴포넌트 설정 | `{ toolbar, event, header }` |

**Components 객체 구조:**
```typescript
{
  toolbar?: ComponentType<ToolbarProps>
  event?: ComponentType<EventProps>
  eventWrapper?: ComponentType<EventWrapperProps>
  header?: ComponentType<HeaderProps>
  dateCellWrapper?: ComponentType<DateCellWrapperProps>
  timeSlotWrapper?: ComponentType
  dayColumnWrapper?: ComponentType
  timeGutterHeader?: ComponentType
  timeGutterWrapper?: ComponentType
  resourceHeader?: ComponentType<ResourceHeaderProps>
  showMore?: ComponentType<ShowMoreProps>
  day?: {
    header?: ComponentType<HeaderProps>
    event?: ComponentType<EventProps>
  }
  week?: {
    header?: ComponentType<HeaderProps>
    event?: ComponentType<EventProps>
  }
  month?: {
    header?: ComponentType<HeaderProps>
    dateHeader?: ComponentType<DateHeaderProps>
    event?: ComponentType<EventProps>
  }
  agenda?: {
    date?: ComponentType<AgendaDateProps>
    time?: ComponentType<AgendaTimeProps>
    event?: ComponentType<EventProps>
  }
}
```

### 기타 Props

| Prop | Type | 설명 | 기본값 |
|------|------|------|--------|
| `toolbar` | `boolean` | 툴바 표시 여부 | `true` |
| `popup` | `boolean` | 팝업 표시 여부 | `false` |
| `popupOffset` | `number \| object` | 팝업 오프셋 | `5` |
| `rtl` | `boolean` | RTL (오른쪽에서 왼쪽) 레이아웃 | `false` |
| `backgroundEvents` | `TEvent[]` | 배경 이벤트 배열 | - |
| `selected` | `any` | 선택된 이벤트 | - |
| `doShowMoreDrillDown` | `boolean` | "더 보기" 드릴다운 활성화 | `false` |
| `drilldownView` | `View \| null` | 드릴다운 뷰 | `null` |
| `getDrilldownView` | `function` | 드릴다운 뷰 결정 함수 | - |
| `length` | `number` | 뷰 길이 (일 수) | - |
| `getNow` | `function` | 현재 시간 반환 함수 | `() => new Date()` |

### 현재 프로젝트에서 사용 중인 Props

```typescript
<Calendar
  // 필수
  localizer={localizer}
  events={events}
  
  // 접근자
  startAccessor="start"
  endAccessor="end"
  resourceIdAccessor={isResourceView ? "resourceId" : undefined}
  resourceTitleAccessor={isResourceView ? "resourceTitle" : undefined}
  
  // 리소스
  resources={isResourceView ? resources : undefined}
  
  // 뷰
  date={currentDate}
  view={currentView}
  onNavigate={(date) => setCurrentDate(date)}
  onView={(view) => setCurrentView(view)}
  views={["month", "week", "day"]}
  defaultView="month"
  
  // 스타일
  style={{ height: "100%", width: "100%" }}
  eventPropGetter={eventStyleGetter}
  
  // 시간 범위
  min={minTime}
  max={maxTime}
  
  // 포맷
  formats={formats}
  messages={messages}
  
  // 이벤트 핸들러
  onSelectEvent={handleSelectEvent}
  onSelectSlot={handleSelectSlot}
  
  // 슬롯 선택
  selectable
  
  // 레이아웃
  dayLayoutAlgorithm="no-overlap"
  
  // 기타
  toolbar={true}
  popup={false}
  onShowMore={undefined}
  components={components}
/>
```

## 📖 참고 자료

- [React Big Calendar 공식 문서](https://jquense.github.io/react-big-calendar/)
- [React Big Calendar GitHub](https://github.com/jquense/react-big-calendar)

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
