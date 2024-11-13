import { Box, Modal } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import once from './../../../node_modules/lodash-es/once';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const Auth = () => {
    const location = useLocation();
    const handleOnCLose =()=>{
        navigate("/")
    }
    const navigate = useNavigate();
  return (
    <>
        <Modal
        open={
            location.pathname==="/account/register"
        || location.pathname ==="/account/login"
        }
        onClose={handleOnCLose}
        >
        <Box sx={style}>

            {location.pathname==="/account/register"?<RegisterForm/>:<LoginForm/>}
        </Box>

        </Modal>

    </>
  )
}

export default Auth