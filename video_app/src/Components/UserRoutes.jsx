import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { CreateAccount } from './CreateAccount'
import { ScreenRecording } from './ScreenRecording'

const UserRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/createAccount' element={<CreateAccount />} />
            <Route path='/screenRecording' element={<ScreenRecording />} />
        </Routes>
    </div>
  )
}

export default UserRoutes