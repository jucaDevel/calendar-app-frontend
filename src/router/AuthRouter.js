import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { LoginScreen } from '../modules/auth/LoginScreen'
import { RegisterScreen } from '../modules/auth/RegisterScreen'

export const AuthRouter = () => {
  return (
    <>
        <div className='auth-main'>
          <div className="login-form">
            <Routes>
                <Route path='login' element={<LoginScreen/>} />
                <Route path='register' element={<RegisterScreen/>} />

                <Route path='*' element={<Navigate to='auth/login' replace />} />
            </Routes>
          </div>
        </div>
    </>
  )
}
