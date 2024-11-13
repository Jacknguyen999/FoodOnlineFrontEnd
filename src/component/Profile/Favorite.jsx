// import React from 'react'
// import RestaurantCard from '../Restaurant/RestaurantCard'
// import { useSelector } from 'react-redux';

// const Favorite = () => {
//   const {auth} = useSelector(Store => Store);
//   return (
//     <div>
//         <h1 className='py-5 text-xl font-semibold text-center'>My Favorite Restaurant </h1>
//         <div className='flex gap-3 flex-wrap justify-center'>

//         {auth.favorites.map((item)=><RestaurantCard item = {item}/>)}

//         </div>

//     </div>
//   )
// }

// export default Favorite

import React from 'react';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useSelector } from 'react-redux';

const Favorite = () => {
  const { auth, restaurant } = useSelector((Store) => Store);

  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favorite Restaurant</h1>
      <div className="flex gap-3 flex-wrap justify-center">
        {auth.favorites.map((favoriteItem) => {
          const restaurantItem = restaurant.restaurants.find(
            (res) => res.id === favoriteItem.id
          );
          // Pass the whole restaurant item to RestaurantCard
          return restaurantItem ? (
            <RestaurantCard item={restaurantItem} key={favoriteItem.id} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Favorite;
