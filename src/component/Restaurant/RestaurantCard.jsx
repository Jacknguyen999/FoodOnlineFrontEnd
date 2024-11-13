import { Card, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../Config/logic';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';


const RestaurantCard = ({item}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const {auth} = useSelector(Store => Store);
  const {restaurant} = useSelector(Store =>Store)
  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt))
},[])

  const handleAddtoFavorite = () => {
    dispatch(addToFavorite({ restaurantId: item.id, jwt }));
};

const handleNavigateToRestaurant =() =>{
  if(item.open){
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)

  }
}




  return (
    <Card  className=' w-[18rem] '>

    <div className={`${item.open?'cursor-pointer':'cursor-not-allowed'} relative`}>

    <img
    className='w-full h-[10rem] rounded-t-md object-cover'
     alt='' src={item.images[0]}/>
    
    
    <Chip
        size='small'
        className='absolute top-2 left-2 '
        color={item.open?"success":"error"}
        label= {item.open?"open":"closed"}
    />
    </div>
    <div className='p-4 textPart lg:flex w-full justify-between'>

    <div className='space-y-1'>
    <p onClick={handleNavigateToRestaurant} className=' cursor-pointer font-semibold text-lg'>{item.name}</p>
    <p className='text-gray-500 text-sm'>{item.description}</p>

    </div>


    <div>

    <IconButton onClick={handleAddtoFavorite}>
        {isPresentInFavorites(auth.favorites,item)?<FavoriteIcon/>: <FavoriteBorderIcon/>}
    </IconButton>

    </div>

    </div>

    </Card>
  )
}

export default RestaurantCard