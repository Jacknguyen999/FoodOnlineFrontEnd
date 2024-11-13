import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../../AdminComponent/AdminRestaurant/CreateRestaurantForm'
import Admin from '../../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

const AminRoute = () => {
  const {restaurant} = useSelector(Store => Store)
  return (
    <div>
        <Routes>
            <Route path='/*' element={!restaurant.usersRestaurant?<CreateRestaurantForm/>:<Admin/>}></Route>
        </Routes>
    </div>
  )
}

export default AminRoute