import { 
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, GET_USERS_ORDERS_FAILURE,
     
} from './ActionType';
import { api } from '../../Config/api'; // Assuming you have a configured api instance

// Action to create a new order
// export const createOrder = (reqData) => async (dispatch) => {
//     dispatch({ type: CREATE_ORDER_REQUEST });
//     try {
//         const { data } = await api.post('/api/order', reqData.data, {
//             headers: {
//                 Authorization: `Bearer ${reqData.jwt}`,
//             }
//         });
//         // if(data.payment_url){
//         //     window.location.href = data.payment_url;
//         // }
//         dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
//         console.log('Order Created:', data);
//     } catch (error) {
//         dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
//         console.error('Error creating order:', error);
//     }
// };
export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post('/api/order', reqData, { // Send reqData directly
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Include JWT here
            }
        });
        if(data.payment_url){
            window.location.href = data.payment_url;
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        console.log('Order Created:', data);
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        console.error('Error creating order:', error);
    }
};

// Action to get all orders for a user
export const getUsersOrders = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
        const { data } = await api.get(`/api/order/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
        console.log('User Orders:', data);
    } catch (error) {
        dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
        console.error('Error getting user orders:', error);
    }
};

// Action to get notifications for a user
// export const getUserNotifications = (userId, jwt) => async (dispatch) => {
//     dispatch({ type: GET_USER_NOTIFICATION_REQUEST });
//     try {
//         const { data } = await api.get(`/api/users/${userId}/notifications`, {
//             headers: {
//                 Authorization: `Bearer ${jwt}`,
//             }
//         });
//         dispatch({ type: GET_USER_NOTIFICATION_SUCCESS, payload: data });
//         console.log('User Notifications:', data);
//     } catch (error) {
//         dispatch({ type: GET_USER_NOTIFICATION_FAILURE, payload: error });
//         console.error('Error getting user notifications:', error);
//     }
// };
