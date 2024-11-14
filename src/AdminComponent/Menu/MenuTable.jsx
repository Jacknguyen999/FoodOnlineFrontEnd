import { Avatar, Box, Button, Card, CardHeader, Chip, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemAvailability } from '../../component/State/Menu/Action';

// const order = [
//     1, 1, 1, 1

// ]

const MenuTable = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { restaurant, ingredients, menu } = useSelector(Store => Store)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            jwt: jwt,
            restaurantId: restaurant.usersRestaurant?.id,
            vegetarian: false,     // default or dynamic value
            seasonal: false,       // default or dynamic value
            nonveq: false,         // default or dynamic value
            foodCategory: ""     // default or dynamic value
        }));
    }, [dispatch, restaurant.usersRestaurant, jwt]);
    const handleRemoveFood = (foodId) => {
        dispatch(deleteFoodAction({ foodId, jwt }))
    }
    const handleUpdateFood = (foodId) => {
        dispatch(updateMenuItemAvailability({ foodId, jwt }))
    }
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Ingredient</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Availability</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell> */}
                                    <TableCell component="th" scope='row'><Avatar
                                        src={item.images[0]}>
                                    </Avatar>
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.ingredients.map((ingredient) =>
                                        <Chip label={ingredient.name}>

                                        </Chip>
                                    )}</TableCell>
                                    <TableCell align="right">{item.price} VND</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleUpdateFood(item.id)}>
                                            {item.available ? "Available" : "Unavailable"}
                                        </Button>

                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="error" onClick={() => handleRemoveFood(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default MenuTable