import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';



const foodTypes = [
    {
        label: "All", value: "all",
    },
    {
        label: "Vegetarian", value: "vegetarian",
    },
    {
        label: "Non-Vegetarian", value: "non-vegetarian",
    },
    {
        label: "Seasonal", value: "seasonal",
    },

];



const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { auth } = useSelector(Store => Store);
    const { restaurant } = useSelector(Store => Store)
    const { menu } = useSelector(Store => Store)

    const { id, city } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("");
    const handleFilter = (e) => {
        setFoodType(e.target.value);
        console.log(e.target.value, e.target.name);
    }
    const handleFilterCategory = (e,value) => {
        setSelectedCategory(value);
        console.log(e.target.value, e.target.name,value);
    }

    console.log("restaurant", restaurant)

    useEffect(() => {
        dispatch(getAllRestaurantById({ jwt, restaurantId: id }))
        dispatch(getRestaurantsCategory({ jwt, restaurantId: id }))

    }, [])

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            jwt, restaurantId: id,
            vegetarian: foodType === 'vegetarian',
            seasonal: foodType === 'seasonal',
            nonveq: foodType === 'non-vegetarian',
            foodCategory: selectedCategory
        }))
    }, [selectedCategory,foodType]);


    return (
        <div className='px-5 lg:px-20 '>

            <section>

                <h3 className='text-gray-500 py-2 mt-10'>
                    Home/Vietname/Restaurant name/1

                </h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <img className='w-full h-[30vh] object-cover'
                                alt=''
                                src={restaurant.restaurant?.images[0]} />


                        </Grid>

                        <Grid item xs={12} lg={6}>

                            <img className='w-full h-[40vh] object-cover'
                                alt=''
                                src={restaurant.restaurant?.images[1]} />


                        </Grid>

                        <Grid item xs={12} lg={6}>

                            <img className='w-full h-[40vh] object-cover'
                                alt=''
                                src={restaurant.restaurant?.images[2]} />


                        </Grid>

                    </Grid>

                </div>

                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>

                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 mt-1 '>{restaurant.restaurant?.description}</p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>Location</span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarMonthIcon />
                            <span>Time</span>
                        </p>
                    </div>


                </div>

            </section>

            <Divider />
            <section className='pt-[2rem] lg:flex relative '>

                <div className='space-y-10 lg:w-[30%] filter ' >
                    <div className='box space-y-5 lg:sticky top-28 '>

                        <div >
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Type

                            </Typography>


                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} 
                                name='food_type' 
                                value={foodType}>
                                    {foodTypes.map((item) =>
                                        <FormControlLabel
                                            key={item}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.label} />
                                    )}

                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div >
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Category

                            </Typography>


                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup
                                    onChange={handleFilterCategory}
                                    name='food_category' 
                                    value={selectedCategory}
                                    >

                                    {restaurant.categories.map((item) =>
                                        <FormControlLabel
                                            key={item}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name} />
                                    )}

                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className='space-y-5 lg:w-[80%] lg:pl-10' >
                    {menu.menuItems.map((item) => <MenuCard item={item} />)}
                </div>

            </section>



        </div>
    )
}

export default RestaurantDetails