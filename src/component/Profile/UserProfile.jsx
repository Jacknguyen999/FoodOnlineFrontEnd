import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout ,changeRole } from '../State/Authentication/Action';
const UserProfile = () => {
  const { auth } = useSelector(Store => Store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt')
  
    const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  }
  const handleChangeRole = () =>{
    dispatch(changeRole(jwt));
    navigate("/");

  }
  console.log("user profile",auth.user)
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>

      <div className='flex flex-col items-center justify-center'>

      <AccountCircleIcon sx={{fontSize:"9rem"}}/>
      <h1 className='py-5 text-2xl font-semibold'>
        Name : {auth.user.fullname}
      </h1>
      <p>Email: {auth.user.email}</p>
      <div className='gap-2'>
        <span >Role : {auth.user.role? "Customer": "Restaurant_Owner  "}</span>
        
      </div>
      <Button onClick={handleChangeRole} sx={{ margin: "0rem" }} variant='outlined'>Change Role</Button>
      <Button variant='contained' onClick={handleLogout} sx={{margin:"2rem 0rem"}}>
        Logout
      </Button>

      </div>

    </div>
  )
}

export default UserProfile