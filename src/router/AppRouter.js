import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'
import Spinner from '../components/Spinner/Spinner'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

const AppRouter = () => {
  const dispatch = useDispatch()

  const {checking, uid} = useSelector(state => state.auth)

  // Efecto que se activa cada que recarga la pagina y manda un action para renueva el token
  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])
  
  if (checking) {
    return (<div style={{height: '100vh', display:'flex', alignItems: 'center'}}><Spinner /> </div>)
  }
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/login" element={
                  <PublicRoute isAuthenticated = {!!uid}>
                    <LoginScreen />
                  </PublicRoute>
                } />

                <Route path="/" element={
                  <PrivateRoute isAuthenticated= {!!uid}>
                    <CalendarScreen />
                  </PrivateRoute>
                } />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    </BrowserRouter>
    
  )
}

export default AppRouter