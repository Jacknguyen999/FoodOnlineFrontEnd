import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './../State/Authentication/Action';

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorite", icon: <FavoriteIcon /> },
    { title: "Address", icon: <HomeIcon /> },
    { title: "Payment", icon: <PaymentIcon /> },
    { title: "Notification", icon: <NotificationsIcon /> },
    { title: "Promo", icon: <EventIcon /> },
    { title: "Logout", icon: <LogoutIcon /> },
]
const ProfileNavigation = ({open,handleClose}) => {
    const isSmallScreen = useMediaQuery(`(max-width: 900px)`)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleNavigate =(item) =>{
        if(item.title==="Logout"){
            dispatch(logout());
            navigate("/");
        }
        else
        navigate(`/my-profile/${item.title.toLowerCase()}`);

    }
    
    return (
        <div>
            <Drawer variant={isSmallScreen ? "temporary" : "permanent"}
                open={open}
                onClose={handleClose}
                anchor='left'
                sx={{ zIndex: -1, position: 'sticky' }}>

                <div className='w-[50vw] lg:w-[15vw] h-[110vh] flex flex-col
                gap-16 pt-16  justify-center text-xl'>

                {menu.map((item,index)=><>
                <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                {item.icon}
                    <span>
                        {item.title}
                    </span>
                </div>
                { index !== menu.length - 1 && <Divider /> }

                </>)}

                </div>

            </Drawer>
        </div>
    )
}

export default ProfileNavigation