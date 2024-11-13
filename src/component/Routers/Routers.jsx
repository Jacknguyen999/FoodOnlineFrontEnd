import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AminRoute from './AminRoute'
import CustomerRouter from './CustomerRouter';

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path='/admin/restaurants/*' element={<AminRoute/>}></Route>
            <Route path='/*' element={<CustomerRouter/>}></Route>
        
        
        
        </Routes>
    </div>
  )
}

export default Routers