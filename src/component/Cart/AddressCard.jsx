import React from 'react'

import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const AddressCard = ({item,showButton,handleSelectAddress}) => {
    const { auth } = useSelector(Store => Store);
    const dispatch = useDispatch();
console.log("User", auth.user.addresses)
    
    return (
        <Card className="flex gap-5 w-64 p-5">

        <HomeIcon />
        <div className='space-y-3 text-gray-500'>

        <h1 className='font-semibold text-lg text-white'>Your Address</h1>

         <p>{item.streetAddress}</p>
                <p>{item.city}</p>
                <p>{item.state}</p>
                <p>{item.postalcode}</p>

        
        {showButton &&
        (<Button variant='outlined' fullWidth onClick={()=>handleSelectAddress(item)}>Select</Button>)}

        </div>





        </Card>
    )
}

export default AddressCard