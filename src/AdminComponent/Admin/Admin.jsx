import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './../Dashboard/Dashboard';
import Menu from './../Menu/Menu';
import FoodCategory from './../FoodCategory/FoodCategory';
import Ingredients from './../Ingredients/Ingredients';
import { RestaurantDetail } from './RestaurantDetail';
import Orders from './../Orders/Orders';
import CreateMenuForm from '../Menu/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantById, getRestaurantsCategory } from '../../component/State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';
import { fetchRestaurantOrders } from './../../component/State/RestaurantOrder/Action';


const Admin = () => {
  const dispatch = useDispatch();
  
  const { restaurant } = useSelector(Store => Store)
  
    const handleClose =()=>{

    }
    // useEffect(()=>{
    //   dispatch(getRestaurantsCategory({
    //     jwt,
    //     restaurantId: restaurant.usersRestaurant.id
    //   }))
    //   // dispatch(getMenuItemsByRestaurantId)
    //   // dispatch(getAllRestaurantById)

    // });
    useEffect(() => {
      const restaurantId =  restaurant.usersRestaurant.id;
      const jwt  =localStorage.getItem('jwt');
      
      if (restaurantId && jwt) {
          dispatch(getRestaurantsCategory({ restaurantId, jwt }));
          // Uncomment the other dispatch calls when ready
          // dispatch(getMenuItemsByRestaurantId(restaurantId));
          // dispatch(getAllRestaurantById(restaurantId));
      } else {
          console.log("Restaurant ID or JWT is missing.");
      }

      dispatch(fetchRestaurantOrders({
        jwt,
        restaurantId
      }))
  }, [dispatch]); // Include necessary dependencies
  return (
    <div>
    <div className='lg:flex justify-between'>
    <div>

        <AdminSideBar handleClose={handleClose}/>
    </div>
    <div className='lg:w-[80%]'>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/category' element={<FoodCategory/>}/>
      <Route path='/ingredient' element={<Ingredients/>}/>
      <Route path='/details' element={<RestaurantDetail/>}/>
      <Route path='/add-menu' element={<CreateMenuForm/>}/>

      
    </Routes>



    </div>

    </div>
    
    </div>
  )
}

export default Admin