import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'

const AppRouter = () => {
    
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/' element={<CalendarScreen />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    </BrowserRouter>
    
  )
}

export default AppRouter