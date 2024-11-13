import { 
    GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, GET_RESTAURANT_ORDER_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE
} from './ActionType';
import { api } from '../../Config/api'; // Assuming you have a configured api instance

// Action to get orders for a restaurant
export const fetchRestaurantOrders = ({restaurantId,orderStatus, jwt}) => async (dispatch) => {
    
    try {
        dispatch({ type: GET_RESTAURANT_ORDER_REQUEST });
        const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
            params: {order_status: orderStatus},
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: GET_RESTAURANT_ORDER_SUCCESS, payload: data });
        console.log('Restaurant Orders:', data);
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_ORDER_FAILURE, payload: error });
        console.error('Error getting restaurant orders:', error);
    }
};

// Action to update the status of an order
export const updateOrderStatus = ({orderId, orderStatus, jwt}) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
        console.log('Order status updated:', response.data);
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
        console.error('Error updating order status:', error);
    }
};
