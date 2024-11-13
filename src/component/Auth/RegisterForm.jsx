import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentication/Action';
import { useDispatch } from 'react-redux';



const initialValues = {
    fullname : "",
    email: "",
    password: "",
    role : "ROLE_CUSTOMER",
}
const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        console.log(" Register form values",values);
        dispatch(registerUser({userData:values,navigate}))
    }
  return (
    <div>

            <Typography variant='h5' className='text-center'>
                Register
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>

                <Form>
                <Field
                        as={TextField}
                        name="fullname"
                        label="Full Name "
                        fullWidth
                        variant="outlined"
                        margin = "normal"

                    />
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
                        name="password"
                        label="Password "
                        fullWidth
                        variant="outlined"
                        margin = "normal"
                        type="password"

                    />
                    {/* <FormControl fullWidth margin = "normal"> */}
        <InputLabel id="role-simple-select-label">Role</InputLabel>
        <Field
        fullWidth
        margin = "normal"
        as= {Select}
          labelId="role-simple-select-label"
          id="role-simple-select"
          name="role"
        //   value={role}
          
        //   onChange={handleChange}
        >
          <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
          {/* <MenuItem value={"RESTAURANT_OWNER"}>Restaurant Owner</MenuItem> */}
          
        </Field>
      {/* </FormControl> */}
                    <Button sx={{mt : 2, padding: "1rem"}} fullWidth type= 'submit' variant='contained'>Register</Button>
                </Form>

            </Formik>
            <Typography variant='body2' align='center' sx={{marginTop :3}}>
                Already have an account?

                <Button size='small' onClick={()=>navigate("/account/login")}>
                    Login 
                </Button>
            </Typography>


        </div>
  )
}

export default RegisterForm