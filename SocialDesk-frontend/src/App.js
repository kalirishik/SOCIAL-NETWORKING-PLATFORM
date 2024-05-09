import React, { useState } from 'react'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import FriendsId from "./Pages/FriendsId/FriendsId"
import { Route, Routes } from 'react-router-dom'
import Notification from './Pages/Notification/Notification'
import Login from './Pages/RegisterPage/Login'
import SignUp from './Pages/RegisterPage/SignUp'
import AdminPage from './Pages/Admin/AdminPage'
import LocationTrack from './LocationTrack'
import LocationTrack2 from './LocationTrack2'

const App = () => {
  const [friendProfile,setFriendsProfile] =useState([])

  return (
    <div className='App'>
      <Routes>
        <Route path='/home' element={<Home setFriendsProfile={setFriendsProfile}/> } />
        
        <Route path='/profile' element={ <Profile /> } />

        <Route path='/friendsId' element={<FriendsId friendProfile={friendProfile} />} />
      
        <Route path='/notification' element={<Notification />} />

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/AdminPanel" element={<AdminPage/>}/>
        <Route path="/LocationDetails" element={<LocationTrack/>}/>
        <Route path="/LocationDetails2" element={<LocationTrack2/>}/>
      </Routes>
    </div>
  )
}

export default App
