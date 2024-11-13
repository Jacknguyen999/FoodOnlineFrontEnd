import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import { Address } from './Address';
import Favorite from './Favorite';
import Event from './Event';
import Payment from './Payment';

const Profile = () => {
    const [openSideBar,setOpenSidebar]= useState(false);
    
  return (
    <div className='lg:flex justify-between'>

    <div className='sticky h-[80vh] lg:w[30%]'>
    <ProfileNavigation open={openSideBar}/>




    </div>
    <div className='lg:w-[80%]'>

    <Routes>
    <Route path='/' element={<UserProfile/>}/>
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/address' element={<Address/>}/>
    <Route path='/favorite' element={<Favorite/>}/>
    <Route path='/promo' element={<Event/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path='/' element={<UserProfile/>}/>

    </Routes>

    </div>


    </div>
  )
}

export default Profile