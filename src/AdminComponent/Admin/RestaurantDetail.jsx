import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRestaurant, updateRestaurantStatus } from '../../component/State/Restaurant/Action';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export const RestaurantDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { restaurant } = useSelector(Store => Store)
  const handleRestarantStatus = () => {
    dispatch(updateRestaurantStatus({restaurantId : restaurant.usersRestaurant?.id , jwt})); //


  }
  const handleRemoveRestaurant = () =>{
    if (window.confirm("Are you sure you want to remove this restaurant?")) {
      dispatch(deleteRestaurant({restaurantId : restaurant.usersRestaurant?.id , jwt}));
      navigate('/')
    }
    

  }
  return (
    <div className='lg:px-20 px-5  pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>

        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          {restaurant.usersRestaurant?.name}
        </h1>
        <div>
          <Button
            className='py-[1rem] px-[2rem] text-gray-950 '
            color={restaurant.usersRestaurant?.open ? "error" : "green"}
            variant='contained'
            onClick={handleRestarantStatus}
            size='large'
            
            >
            {restaurant.usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>
       

      </div>
      <Grid container spacing={2}>
        {/* Restaurant information */}
        <Grid item xs={12} >
          <Card>
            <CardHeader title={<span className='text-gray-300' >
              Restaurant
            </span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                {/* Owner Card */}
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.owner?.fullname}
                  </p>

                </div>

                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>

                </div>

                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.openingHour}

                  </p>

                </div>

                {/* open close card */}
                <div className="flex">
                  <p className="w-48">Status</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400
       text-gray-950 text-center leading-none">
                        Opened
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-700
       text-gray-950 text-center leading-none">
                        Closed
                      </span>
                    )}
                  </p>
                </div>



              </div>
            </CardContent>

          </Card>

        </Grid>
        {/* Restaurant Address */}
        <Grid item xs={12} lg={6} >
          <Card>
            <CardHeader title={<span className='text-gray-300' >
              Address
            </span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                {/* Owner Card */}
                <div className='flex'>
                  <p className='w-48'>State</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address?.state}
                  </p>

                </div>

                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address?.city}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Postal Code</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address?.postalcode}
                  </p>

                </div>

                <div className='flex'>
                  <p className='w-48'>Street Address</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address?.streetAddress}
                  </p>

                </div>

                {/* open close card */}
                {/* <div className="flex">
  <p className="w-48">Status</p>
  <p className="text-gray-400">
    <span className="pr-5">-</span>
    {true ? (
      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950 text-center leading-none">
        Open
      </span>
    ) : (
      <span className="px-5 py-2 rounded-full bg-red-700 text-gray-950 text-center leading-none">
        Close
      </span>
    )}
  </p>
</div> */}



              </div>
            </CardContent>

          </Card>

        </Grid>

        {/* Restaurant Contact */}
        <Grid item xs={12} lg={6} >
          <Card>
            <CardHeader title={<span className='text-gray-300' >
              Contact
            </span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                {/* Owner Card */}
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>

                </div>

                <div className='flex'>
                  <p className='w-48'>Phone Number</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.phone}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Social</p>
                  <div className='flex items-center pb-3 gap-2'>
                    <span className='pr-5'>-</span>
                    <a href={`https://${restaurant.usersRestaurant?.contactInformation?.facebook}`}
                     className="text-gray-400 hover:text-gray-300"
                     target="_blank" 
                     rel="noopener noreferrer">
                      <FacebookIcon />
                    </a>
                    <a href={`https://${restaurant.usersRestaurant?.contactInformation?.facebook}`}
                     className=" text-gray-400 hover:text-gray-300 "
                     target="_blank" 
                     rel="noopener noreferrer">
                      <InstagramIcon />
                    </a>
                  </div>

                </div>







              </div>
            </CardContent>

          </Card>

        </Grid>

      </Grid>

      
      <div className='pt-10'>
          <Button
          className='py-[1rem] px-[2rem] text-gray-950 '
          color = {"error"}
          variant='contained'
          size='large'
          onClick={handleRemoveRestaurant}
          >
            Delete Restaurant
          </Button>
        </div>
      

    </div>
  )
}
