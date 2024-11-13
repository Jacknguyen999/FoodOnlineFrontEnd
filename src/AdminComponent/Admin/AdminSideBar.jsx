import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const menu =[
    {title :"Dashboard",icon: <Dashboard/>,path:'/'},
    {title :"Orders",icon: <ShoppingBag/>,path:'/orders'},
    {title :"Menu",icon: <RestaurantMenuIcon/>,path:'/menu'},
    {title :"FoodCategory",icon: <CategoryIcon/>,path:'/category'},
    {title :"Ingredient",icon: <FastfoodIcon/>,path:'/ingredient'},
    {title :"Details",icon: <AdminPanelSettingsIcon/>,path:'/details'},
    {title :"Logout",icon: <LogoutIcon/>,path:'/'},
]
const AdminSideBar = ({handleClose}) => {
    const isSmallScreen = useMediaQuery("max-width: 900px")
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleNavigate = (item)=>{
        navigate(`/admin/restaurants${item.path}`)
        if(item.title === "Logout"){
            dispatch(logout())
            navigate("/")
            handleClose()
        }

    }
  return (
    <div>

    <>
        <Drawer 
        variant={isSmallScreen?"temporary":"permanent"}
        open={true} 
        onClose={handleClose}
         sx={{zIndex:1}} 
         anchor='left'> 
        
        <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>

        {menu.map((item,i)=> <>
            <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
                {item.icon}
                <span>{item.title}</span>

            </div>
            {i!== menu.length-1 &&<Divider/>}
        </> )}
        </div>

        </Drawer>


    </>
        
    </div>
  )
}

export default AdminSideBar