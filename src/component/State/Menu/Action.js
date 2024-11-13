import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEMS_FAILURE, DELETE_MENU_ITEMS_REQUEST, DELETE_MENU_ITEMS_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";
import { api, API_URL } from "../../Config/api";


export const createMenuItem = ({menu,jwt}) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.post(`/api/admin/food`, menu, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
        console.log("Menu Item Created:", data);
    } catch (error) {
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        console.error("Error creating menu item:", error);
    }
};

// Action to get menu items by restaurant ID
export const getMenuItemsByRestaurantId = (reqData) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&seasonal=${reqData.seasonal}&nonveq=${reqData.nonveq}&food_category=${reqData.foodCategory}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        });
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
        console.log("Menu Items by Restaurant ID:", data);
    } catch (error) {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.error("Error getting menu items by restaurant ID:", error);
    }
};

// Action to search for a menu item by name
export const searchMenuItem = ({searchQuery, jwt}) => async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.get(`/api/food/search?name=${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
        console.log("Search Results for Menu Item:", data);
    } catch (error) {
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        console.error("Error searching for menu item:", error);
    }
};

export const updateMenuItemAvailability = ({foodId, jwt}) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/food/${foodId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
        console.log("Updated Menu Item Availability:", data);
    } catch (error) {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error });
        console.error("Error updating menu item availability:", error);
    }
};

export const deleteFoodAction = ({foodId, jwt}) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEMS_REQUEST });
    try {
        const {data} =await api.delete(`/api/admin/food/${foodId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: DELETE_MENU_ITEMS_SUCCESS, payload: foodId });
        console.log("Menu Item Deleted:", data);
    } catch (error) {
        dispatch({ type: DELETE_MENU_ITEMS_FAILURE, payload: error });
        console.error("Error deleting menu item:", error);
    }
};