
import * as actionTypes from './ActionType';

const initialState = {
    menuItems: [],
    loading: false,
    error: null,
    search: [],
    message: null,
};

const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEMS_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };

        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload], // Assuming payload contains the new menu item
                message: 'Food created successfully!',

            };
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            
            return {
                ...state,
                loading: false,
                menuItems: action.payload, // Assuming payload contains an array of menu items

            };
        case actionTypes.DELETE_MENU_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                // hinh nhu sai
                menuItems: state.menuItems.filter(item => item.id !== action.payload), // Assuming payload contains item id
                message: 'Menu item deleted successfully!',

            };
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("update items id", action.payload.id);
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(item =>
                    item.id === action.payload.id
                        ? action.payload
                        : item
                ), // Assuming payload contains id and updated availability status
                message: 'Menu item availability updated successfully!',
                error: null,
            };

        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload, // Assuming payload contains search results

            };

        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEMS_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message : null,
            }

        default:
            return state;
    }
}

export default menuItemReducer;