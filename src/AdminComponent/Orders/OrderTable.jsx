import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantOrders, updateOrderStatus } from '../../component/State/RestaurantOrder/Action';

const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
    
];

const OrderTable = ({ filterValue }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { restaurant, restaurantOrder } = useSelector(Store => Store);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentOrderId, setCurrentOrderId] = React.useState(null);

    const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setCurrentOrderId(orderId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentOrderId(null);
    };

    const handleUpdateOrder = (orderId, orderStatus) => {
        dispatch(updateOrderStatus({ orderId, orderStatus, jwt }))
            .then(() => {
                dispatch(fetchRestaurantOrders({ jwt, restaurantId: restaurant.usersRestaurant?.id }));
            });
        handleClose();
    };

    useEffect(() => {
        dispatch(fetchRestaurantOrders({ jwt, restaurantId: restaurant.usersRestaurant?.id }));
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    // Filter orders based on the selected filterValue
    const filteredOrders = restaurantOrder.orders.filter((item) => {
        return filterValue === "ALL" || item.orderStatus === filterValue;
    });

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Ingredient</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="right">
                                        <AvatarGroup>
                                            {item.items.map((orderItem) => <Avatar src={orderItem.food?.images} />)}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="right">{item.customer?.fullname}</TableCell>
                                    <TableCell align="right">{item.totalPrice} VND</TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem) => <p>{orderItem.food?.name}</p>)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem) =>
                                            <div>
                                                {orderItem.food.ingredients.map((ingredient) => <Chip label={ingredient.name} />)}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">{item.orderStatus}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            id="basic-button"
                                            aria-controls={anchorEl ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={anchorEl ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, item.id)}
                                        >
                                            Update
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl) && currentOrderId === item.id}
                                            onClose={handleClose}
                                        >
                                            {orderStatus.map((status) => (
                                                <MenuItem key={status.value} onClick={() => handleUpdateOrder(item.id, status.value)}>
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default OrderTable;
