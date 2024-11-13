import { 
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, GET_USERS_ORDERS_FAILURE,
    GET_USER_NOTIFICATION_REQUEST, GET_USER_NOTIFICATION_SUCCESS, GET_USER_NOTIFICATION_FAILURE 
} from './ActionType';

const initialState = {
    orders: [],
    loading: false,
    error: null,
};
const orderReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        // Handling request actions to set loading state
        case GET_USERS_ORDERS_REQUEST: 
            return {
                ...state,
                loading: true,
                error: null,
            };

        // Handling success actions for orders
        case GET_USERS_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: payload, // Replacing orders with the fetched user orders
                error: null,
            };

        // Handling success actions for notifications
        // case GET_USER_NOTIFICATION_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         notifications: payload, // Setting the user notifications
        //         message: 'Notifications fetched successfully!',
        //     };

        // Handling failure actions
        // case CREATE_ORDER_FAILURE:
        case GET_USERS_ORDERS_FAILURE:
        // case GET_USER_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload, // Storing error message
                
            };

        default:
            return state;
    }
};

export default orderReducer;