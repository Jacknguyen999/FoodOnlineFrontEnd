import { Box, Card, CardHeader, Icon, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateFoodCategory from './CreateFoodCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';

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

const FoodCategoryTable = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { restaurant } = useSelector(Store => Store)
    // console.log("Restaurant details", restaurant)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        const restaurantId = restaurant.usersRestaurant.id;
        

        if (restaurantId && jwt) {
            dispatch(getRestaurantsCategory({ restaurantId, jwt }));
            
        } else {
            console.log("Restaurant ID or JWT is missing.");
        }


    }, [dispatch]);
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Food Category "}
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

                                <TableCell align='left' >Id</TableCell>
                                <TableCell align='left'>Name</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.categories.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >


                                    <TableCell align="left" >{item.id}</TableCell>
                                    <TableCell align="left" >{item.name}</TableCell>




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

                    <CreateFoodCategory />
                </Box>
            </Modal>
        </Box>
    )
}

export default FoodCategoryTable