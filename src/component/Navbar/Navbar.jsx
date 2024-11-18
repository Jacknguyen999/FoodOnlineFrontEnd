import { alpha, AppBar, Avatar, Badge, IconButton, InputBase, styled, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import { Handshake, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurant } from '../State/Restaurant/Action';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const Navbar = () => {
    const { auth, cart } = useSelector(Store => Store)
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        }
        else {
            navigate("/admin/restaurants");
        }
    }
    const handleHomepageClick = () => {
        navigate("/");
    }
    const navigate = useNavigate();

    const CartClick = () =>{
        if(auth.user)
        navigate("/cart");
        else {
            navigate("/account/login");
        }
    }

    const handleSearch = () => {
        if (searchKeyword.trim()) {
            dispatch(searchRestaurant({ searchKeyword, jwt }));
        }
    };
    return (
        <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#03204a] lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={handleHomepageClick} className='logo  text-gray-300 text-2xl'>
                    Thomas Food
                </li>
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>

                <Toolbar>
                    {/* search Icon */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                        />
                    </Search>
                </Toolbar>


                {/* Avatar */}
                <div className=''>

                    {auth.user ? (<Avatar
                        onClick={handleAvatarClick}
                        sx={{ bgcolor: "white" }}>
                        {auth.user?.fullname[0].toUpperCase()}
                    </Avatar>) :
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>}


                </div>

                {/* Shopping Cart  */}
                <div>
                    <IconButton onClick={CartClick}>
                        <Badge color="primary" badgeContent={cart.cart?.item.length}>
                            <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                        </Badge>

                    </IconButton>
                </div>


            </div>
        </div>
    );
};
