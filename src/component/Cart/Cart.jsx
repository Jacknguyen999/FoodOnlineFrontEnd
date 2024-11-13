import { Box, Button, Card, Divider, Grid, Modal, TextField, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../State/Cart/ActionType'; // Assuming you're dispatching actions to load the cart data
import { createOrder } from './../State/Order/Action';

export const style = {
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

const initialValues = {
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
}

const Cart = () => {
    const [open, setOpen] = React.useState(false);
    
    const { cart,auth } = useSelector(Store => Store);
    
    const [loading, setLoading] = useState(true);  // Loading state to track if cart data is available
    const handleClose = () => setOpen(false);
    const createOrderUsingSelectedAddress = () => {
        console.log('Order created')
    }
    const handleOpenAddressModal = () => {
        setOpen(true)
    }
    const handleSubmit = (values) => {
        // const data = {
        //     restaurantId: cart.cartItems[0].food?.restaurent.id, // Ensure this is correctly set
        //     deliveryAddress: {
        //         streetaddress: values.streetAddress, // Ensure the key matches (case-sensitive)
        //         city: values.city,
        //         stateProvince: values.state, // Ensure the key matches (case-sensitive)
        //         postalCode: values.postalCode,
        //         country: "VietNam"
        //     }
        // };
        const data = {
            restaurantId: cart.cartItems[0].food?.restaurent.id, // Ensure this is correctly set
            deliveryAddress: {
                streetAddress: values.streetAddress, // Ensure the key matches (case-sensitive)
                city: values.city,
                state: values.state, // Ensure the key matches (case-sensitive)
                postalcode: values.postalCode,
                country: "VietNam"
            }
        };
        console.log("data", data);
        dispatch(createOrder(data));
    };
    
    

    
    const dispatch = useDispatch();  // Assuming you're dispatching actions to fetch cart data

    useEffect(() => {
        // Dispatch action to fetch the cart data if not already available
        if (!cart) {
            dispatch({ type: actionTypes.FIND_CART_REQUEST });
        }

        // Wait for cart data to be available
        if (cart && cart.cartItems) {
            setLoading(false);  // Set loading to false once the cart data is fetched
        }

    }, [cart, dispatch]);  // Re-run when cart data changes

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>; // Show loading spinner until cart is loaded
    }

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[25%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems?.map((item) => (
                        <CartItem item={item} key={item.id} />
                    ))}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>{cart.cart?.total} VND</p> {/* Use fallback if cart or cart.total is undefined */}
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Shipping Fee</p>
                                <p>40000 VND</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>App Fee</p>
                                <p>4000 VND</p>
                            </div>
                            <Divider flexItem />
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Total Pay</p>
                            <p>{cart.cart?.total  + 40000 + 4000} VND</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center items-center font-semibold text-2xl py-10'>
                            Choose Delivery Address
                        </h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {auth.user.addresses?.map((item, index) => (
                                <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} key={index} />
                            ))}
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocationAltIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                    <Button variant='contained' fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                        <Form >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="postalCode"
                                        label="Postal Code"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <Button fullWidth variant='contained' type="submit" color='primary' disabled={false}>
    Delivery Here
</Button>

                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
};

export default Cart;
