import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { CalendarScreen } from '../modules/calendar/CalendarScreen'
import { useDispatch, useSelector } from 'react-redux'
import { startChecking } from '../actions/auth'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch( startChecking() )
  }, [dispatch])
  
  if(isLoading){
    return ( <h1>Espereee....</h1>)
  }

  return (
    <Router>
      <Routes>
          <Route path='/auth/*' element={
            <PublicRoutes isAuth={ !!uid }>
              <AuthRouter/>
            </PublicRoutes>
          }/>
          <Route path='/*' element={
            <PrivateRoutes isAuth={ !!uid }>
              <CalendarScreen/>
            </PrivateRoutes>
          } />

          <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Router>
  )
}
