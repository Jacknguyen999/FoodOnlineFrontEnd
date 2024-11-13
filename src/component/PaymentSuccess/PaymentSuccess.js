import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentSuccess = () => {
    const {order} = useSelector(Store => Store)
    console.log('PaymentSuccess', order)
    const navigate = useNavigate();
  return (
    <div className='min-h-screen px-5'>
    <div className='flex flex-col items-center justify-center h-[90vh]'>

    <Card className='  p-5 box w-full lg:w-1/4 flex flex-col items-center rounded-md'>

<TaskAltIcon sx={{fontSize:"5rem", color:green[500]}}/>
<h1 className=' py-5 text-2xl font-semibold '>Payment Success</h1>
<h2 className=' py-0 text-xl font-semibold '>
    
</h2>
<p className='py-2 text-center text-gray-400 text-lg'> Thank You</p>


<Button onClick={()=>navigate("/")} variant='contained' className='py-5' sx={{margin : "1rem 0rem"}}>
    Redirect To HomePage
</Button>

    </Card>

    </div>

    </div>
  )
}

export default PaymentSuccess