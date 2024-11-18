import { api } from "../../Config/api";
import {  CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, SEARCH_RESTAURANT_FAILURE, SEARCH_RESTAURANT_REQUEST, SEARCH_RESTAURANT_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";




export const getAllRestaurantsAction = (token) => async (dispatch) =>{

    dispatch({type: GET_ALL_RESTAURANT_REQUEST})

    try {
        
        const {data} = await api.get(`/api/restaurants`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        dispatch({type:GET_ALL_RESTAURANT_SUCCESS, payload : data})
        console.log("All Restaurant",data)
    } catch (error) {
        dispatch({type:GET_ALL_RESTAURANT_FAILURE, payload : error})
        console.log("error",error);
        
    }
}
export const getAllRestaurantById = (reqData) => {
    return async (dispatch) =>{


    dispatch({type: GET_RESTAURANT_BY_ID_REQUEST})

    try {
        
        const response = await api.get(`/api/restaurants/${reqData.restaurantId}`,{
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        });
        
        dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS, payload : response.data})
        console.log("Restaurant by Id",response);
    } catch (error) {
        dispatch({type:GET_RESTAURANT_BY_ID_FAILURE, payload : error})
        console.log("error",error);
        
    }
}
}

export const getAllRestaurantByUserId = (jwt) => {
    return async (dispatch) =>{


    dispatch({type: GET_RESTAURANT_BY_USER_ID_REQUEST})

    try {
        
        const {data} = await api.get(`/api/admin/restaurants/user`,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS, payload :data})
        console.log("Restaurant by user  Id",data);
    } catch (error) {
        dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE, payload : error})
        console.log("error",error);
        
    }
}
}

export const createRestaurant = (reqData) => {
    return async (dispatch) =>{


    dispatch({type: CREATE_RESTAURANT_REQUEST})

    try {
        
        const {data} = await api.post(`/api/admin/restaurants`,reqData.data,{
            headers: {
                Authorization: `Bearer ${reqData.token}`
            }
        });
        
        dispatch({type:CREATE_RESTAURANT_SUCCESS, payload : data})
        console.log("Create Restaurant",data);
    } catch (error) {
        dispatch({type:CREATE_RESTAURANT_FAILURE, payload : error})
        console.log("error",error);
        
    }
}
}

export const updateRestaurant = ({restaurantId,restaurantData,jwt}) => {
    return async (dispatch) =>{


    dispatch({type: UPDATE_RESTAURANT_REQUEST})

    try {
        
        const res = await api.put(`/api/admin/restaurants/${restaurantId}`,restaurantData,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({type:UPDATE_RESTAURANT_SUCCESS, payload : res.data})
        
    } catch (error) {
        dispatch({type:UPDATE_RESTAURANT_FAILURE, payload : error})
        console.log("error",error);
        
    }
}
}

export const deleteRestaurant = ({restaurantId, jwt}) => async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    try {
        const res = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
        console.log("Deleted Restaurant:", res.data);
    } catch (error) {
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
        console.log("Why", error);
    }
};

export const updateRestaurantStatus = ({restaurantId, jwt}) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
        const res = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
        console.log("Updated Restaurant Status", res.data);
    } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
        console.log("error", error);
    }
};

// Create category
export const createCategoryAction = ({reqData, jwt}) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
        const  res  = await api.post(`/api/admin/category`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
        console.log("Created Category", res.data);
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
        console.log("error", error);
    }
};

// Get all categories for restaurants
export const getRestaurantsCategory = ({restaurantId,jwt}) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });

    try {
        const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
        console.log("Restaurant Categories", res.data);
    } catch (error) {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
        console.log("error", error);
    }
};


export const searchRestaurant = ({ keyword, jwt }) => async (dispatch) => {
    dispatch({ type: SEARCH_RESTAURANT_REQUEST });

    try {
        const { data } = await api.get(`/api/restaurants/search?keyword=${keyword}`, {
            headers: { Authorization: `Bearer ${jwt}` }
            
        });

        dispatch({ type: SEARCH_RESTAURANT_SUCCESS, payload: data });
        console.log("Search Result:", data);
    } catch (error) {
        dispatch({ type: SEARCH_RESTAURANT_FAILURE, payload: error });
        console.log("Search Error:", error);
    }
};





