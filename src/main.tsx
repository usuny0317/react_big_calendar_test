import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CalendarFour from './pages/calendarfour.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <CalendarFour />
  </StrictMode>,
)
