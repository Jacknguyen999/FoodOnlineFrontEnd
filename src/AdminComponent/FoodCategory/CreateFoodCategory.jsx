import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/Action';

const CreateFoodCategory = () => {
    const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { restaurant } = useSelector(Store => Store)
    const [formData, setFormData] = useState({ categoryName: '', restaurantId: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name : formData.categoryName,
            // restaurantId : {
            //     id : 1,
            // },
        };
        dispatch(createCategoryAction({reqData : data ,jwt}))
        console.log(data);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value,
        })
    }
    return (
        <div className=''>
            <div className=''>

                <h1 className='text-gray-400 text-center text-xl pb-10'>
                    Create Category
                </h1>
                <form className='space-y-4' onSubmit={handleSubmit}>

                    <TextField fullWidth
                        id='categoryName'
                        name='categoryName'
                        label='Food Category Name'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.categoryName}
                    >


                    </TextField>


                <Button variant='contained' type='submit'> 
                Create Food Category </Button>
                </form>

            </div>
        </div>
    )
}

export default CreateFoodCategory