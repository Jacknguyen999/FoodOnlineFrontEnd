import { Card } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';

export const Address = () => {
  const { auth } = useSelector((Store) => Store);
  const dispatch = useDispatch();

  // Check if auth and auth.user are available
  if (!auth || !auth.user || !auth.user.addresses) {
    return <p>No address available</p>; // Display a message if there's no address data
  }

  return (
    <div className=' pt-5 flex gap-5 flex-wrap justify-center'>
      {auth.user.addresses.map((address, index) => (
        <Card className="flex gap-5 w-64 p-5" key={index}>
          <HomeIcon />
          <div className="space-y-3 text-gray-500">
            <h1 className="font-semibold text-lg text-white">Your Address</h1>
            <p>{address.streetAddress}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.postalcode}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
