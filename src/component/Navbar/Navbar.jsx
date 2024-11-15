import { Avatar, Badge, IconButton } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import { Handshake, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const {auth ,cart} = useSelector(Store=> Store)
    console.log("cart",cart)
    const handleAvatarClick =()=>{
        if(auth.user?.role === "ROLE_CUSTOMER"){
            navigate("/my-profile");
        }
        else {
            navigate("/admin/restaurants");
        }
    }
    const handleHomepageClick =()=>{
        navigate("/");
    }
    
    const navigate = useNavigate();
    return (
        <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#03204a] lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={handleHomepageClick} className='logo font-semibold text-gray-300 text-2xl'>
                    Thomas Food 
                </li>
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div>
                {/* search Icon */}
                <IconButton>
                    <SearchIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
                </div>
                {/* Avatar */}
                <div className=''>

                    {auth.user?(<Avatar
                    onClick={handleAvatarClick}    
                     sx={{bgcolor:"white"}}>
                        {auth.user?.fullname[0].toUpperCase()}
                    </Avatar>):
                    <IconButton onClick={() =>navigate("/account/login")}>
                        <Person/>
                    </IconButton>}


                </div>

{/* Shopping Cart  */}
                <div>
                <IconButton onClick={()=> navigate("/cart")}>
                    <Badge color="primary" badgeContent={cart.cart?.item.length}>
                    <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                    </Badge>
                    
                </IconButton>
                </div>


            </div>
        </div>
    );
};
