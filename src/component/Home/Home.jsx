import React, { useEffect } from 'react'
import "./Home.css";
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction, searchRestaurant } from '../State/Restaurant/Action';




export const Home = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const {restaurant} = useSelector(Store =>Store)

    // console.log("restaurant" ,restaurant );

    useEffect(() => {
        
        dispatch(getAllRestaurantsAction(jwt))
        
        
        dispatch(searchRestaurant)
        
        
    },[])

    const restaurantsToDisplay = restaurant.searchResults.length ? restaurant.searchResults : restaurant.restaurants;
    

  return (
    <div className='pb-10'>

        <section className='banner -z-50 relative flex flex-col justify-center items-center'>

        <div className='w-[50vw] z-10 text-center'>

        <p className=' restaurant text-2xl lg:text-6xl font-semibold z-10 py-5'>
            Thomas Food
        </p>
        <p className='welcome z-10 text-gray-200 text-xl lg:text-4xl'>
            Welcome to our website!
        </p>

        </div>
        <div className='cover absolute top-0 left-0 right-0'>



        </div>

        <div className='fadeout'>


        </div>

        </section>
        <section className='p-10 lg:py-10 lg:px-20 '>
        <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'> Best Seller</p>
            <MultiItemCarousel/>
        </section>
        <section className='px-5 lg:px-20 pt-10'>
            <h1 className='text-2xl font-semibold text-gray-400 pb-5'>
                All Restaurant
            </h1>
            <div className='flex flex-wrap items-center justify-around gap-4'>
            {
                restaurant.restaurants.map((item)=><RestaurantCard item={item}/>) 
                /* restaurantsToDisplay.map((item)=><RestaurantCard item={item}/>) */
                
            }

            </div>
        </section>
    </div>
  )
}
