import { Box, Button, Card, CardHeader, Icon, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIngredient from './CreateIngredient';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStock } from '../../component/State/Ingredients/Action';

const order = [
    1, 1, 1, 1

]
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const IngredientTable = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { restaurant, ingredients } = useSelector(Store => Store)
    // console.log("ingredient",ingredients )
    const handleUpdateStock = (ingredientId) => {
        dispatch(updateStock({ ingredientId, jwt }));
    };
    


    useEffect(() => {
        dispatch(getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant.id }))
    }, [])
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Ingredient"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Availability</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.ingredients.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.category.name}</TableCell>
                                    <TableCell align="right">{
                                        <Button onClick={() => handleUpdateStock(item.id)}>
                                            {item.inStock ? "In Stock" : "Out of Stock"}
                                        </Button>

                                    }</TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <CreateIngredient />
                </Box>
            </Modal>
        </Box>
    )
}

export default IngredientTable