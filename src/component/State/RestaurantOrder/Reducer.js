import { 
    GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, GET_RESTAURANT_ORDER_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE
} from './ActionType';

const initialState = {
    orders: [],  // Holds orders for the restaurant
    loading: false,        // Tracks the loading state
    error: null,           // Holds error message if any
   
};

const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle request actions to set loading state
        case GET_RESTAURANT_ORDER_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        // Handle success actions for fetching restaurant orders
        case GET_RESTAURANT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload, // Set the fetched orders
            };
        // Handle success actions for updating order status
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ), // Update the order status in the restaurantOrders array
                message: 'Order status updated successfully!',
            };

        // Handle failure actions to update the error state
        case GET_RESTAURANT_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Store the error message
                
            };

        default:
            return state;
    }
};

export default restaurantOrderReducer;
