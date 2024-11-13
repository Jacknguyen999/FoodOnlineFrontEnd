
import { LOGOUT } from '../Authentication/ActionType';
import * as actionTypes from './ActionType';

const initialState = {
    cartItems: [],
    cart: null,
    error: null,
    loading: false,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CARTITEM_REQUEST:
        case actionTypes.REMOVE_CARTITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.item
                
            };
            
            
            case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    cartItems: [action.payload, ...state.cartItems],
                    // wtf 
                    cart: { ...state.cart, item: [action.payload, ...state.cart.item] } // assuming `item` holds the cart items in `cart`
                };
        case actionTypes.UPDATE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),


                
            };
        case actionTypes.REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
                message: 'Item removed from cart successfully!',
            };
        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.CLEAR_CART_FAILURE:
        case actionTypes.REMOVE_CARTITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT: 
            localStorage.removeItem('jwt');
            return {
                ...state,
                cartItems: [],
                cart: null,
                success: "logged out"
            };
        default:
            return state;
    }
};

export default cartReducer;