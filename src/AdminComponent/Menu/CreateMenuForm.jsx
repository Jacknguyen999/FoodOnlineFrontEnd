import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { UploadPhotoToCLoud } from '../utils/UploadPhotoToCLoud';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from './../../component/State/Menu/Action';
import { useNavigate } from 'react-router-dom';





const initialValues = {
    name: "",             // Name of the item
    description: "",      // Description of the item
    price: "",            // Price of the item
    category: "",         // Category of the item (e.g., Appetizer, Main Course)
    restaurantId: "",     // ID of the associated restaurant
    vegetarian: true,     // Boolean indicating if the item is vegetarian
    seasonal: false,      // Boolean indicating if the item is seasonal
    ingredients: [],      // Array to store ingredients of the item
    images: []            // Array to store image URLs or files
};


const CreateMenuForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { restaurant, ingredients } = useSelector(Store => Store)
    const [uploadImage, setUploadImage] = useState(false);
    const navigate = useNavigate();
    console.log("restaurant: ", restaurant);
console.log("ingredients: ", ingredients);


    // Them Anh 
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setUploadImage(true);
        const image = await UploadPhotoToCLoud(file);

        console.log("image: " + image);
        formik.setFieldValue("images", [...formik.values.images, image]); // Corrected here
        setUploadImage(false);
    };

    // Xoa Anh
    const handleRemoveImage = (index) => {
        const updatedImages = [...formik.values.images]
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);


    }
    const formik = useFormik({
        initialValues,
        
        onSubmit: (values) => {
            values.restaurantId = restaurant.usersRestaurant.id;
            dispatch(createMenuItem({menu : values,jwt}))
        }
    });
    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg: max-w-4xl'>
                <h1 className='font-bold text-2xl text-center py-2'>
                    Create New Food
                </h1>
                <form onSubmit={formik.handleSubmit}
                    className='space-y-4 '
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} className='flex flex-wrap gap-5'>

                            <input
                                accept='image/*'
                                type='file'
                                id='fileInput'
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <label htmlFor='fileInput' className='relative'>
                                <span className='w-24 h-24 flex items-center justify-center p-3 border
                cursor-pointer rounded-md border-gray-600
        '>
                                    <AddAPhotoIcon className='text-white' />

                                </span>
                                {
                                    uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0
            w-24 h-24 flex justify-center items-center
        '>
                                        <CircularProgress />
                                    </div>
                                }
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formik.values.images.map((image, index) =>
                                    <div className='relative'>
                                        <img
                                            className='w-24 h-24 object-cover'
                                            key={index}
                                            src={image} alt='' />
                                        <IconButton
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                                outline: 'none',
                                            }}
                                            onClick={() => handleRemoveImage(index)}>
                                            <CloseIcon
                                                sx={{ fontSize: '1rem', color: 'primary' }}
                                            />
                                        </IconButton>

                                    </div>
                                )}

                            </div>

                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth
                                id='name'
                                name='name'
                                label='Name'
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            >


                            </TextField>

                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth
                                id='description'
                                name='description'
                                label='Description'
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            >


                            </TextField>

                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <TextField fullWidth
                                id='price'
                                name='price'
                                label='Price'
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            >


                            </TextField>

                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.category}
                                    label="Category"
                                    onChange={formik.handleChange}
                                    name='category'
                                >
                                    {restaurant.categories.map((item)=>
                                        <MenuItem value={item}>{item.name}</MenuItem>
                                        
                                        )}
                                    
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-multiple-chip-label">Ingredient</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    name='ingredients'
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredient" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                //   MenuProps={MenuProps}
                                >
                                    {ingredients.ingredients.map((item, index) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>


                        <Grid item xs={12} lg={6}>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Vegetarian</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.vegetarian}
                                    label="Vegetarian"
                                    onChange={formik.handleChange}
                                    name='vegetarian'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Seasonal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.seasonal}
                                    label="Seasonal"
                                    onChange={formik.handleChange}
                                    name='seasonal'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Button className='mt-4 justify-center flex items-center' variant='contained' color='primary' type='submit'>
                        Create Restaurant
                    </Button>

                </form>
            </div>

        </div>
    )
}

export default CreateMenuForm