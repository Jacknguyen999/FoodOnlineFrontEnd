import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import values from './../../../node_modules/lodash-es/values';
import { useDispatch } from 'react-redux';
import { loginUser } from '../State/Authentication/Action';


const initialValues = {
    email: "",
    password: "",
}

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(loginUser({userData:values,navigate}))
    }
    return (
        <div>

            <Typography variant='h5' className='text-center'>
                Login
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>

                <Form>
                    <Field
                        as={TextField}
                        name="email"
                        label="Email "
                        fullWidth
                        variant="outlined"
                        margin = "normal"

                    />
                    <Field
                        as={TextField}
                        type="password"
                        name="password"
                        label="Password "
                        fullWidth
                        variant="outlined"
                        margin = "normal"

                    />

                    <Button sx={{mt : 2, padding: "1rem"}} fullWidth type= 'submit' variant='contained'>Login</Button>
                </Form>

            </Formik>
            <Typography variant='body2' align='center' sx={{marginTop :3}}>
                Don't have an account?

                <Button size='small' onClick={()=>navigate("/account/register")}>
                    Register Now
                </Button>
            </Typography>


        </div>
    )
}

export default LoginForm