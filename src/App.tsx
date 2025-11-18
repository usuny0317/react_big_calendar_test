import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CalendarFour from './pages/calendarfour'
import CustomCalendar from './pages/customcalendar'

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/calendarapi" element={<CalendarFour />} />
        <Route path="/customcalendar" element={<CustomCalendar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;