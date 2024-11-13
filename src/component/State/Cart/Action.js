import { api } from "../../Config/api";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, CREATE_CART_FAILURE, CREATE_CART_REQUEST, CREATE_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS } from "./ActionType";

export const findCart = (token) => async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const response = await api.get(`/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
      console.log("Cart Found:", response.data );
    } catch (error) {
      dispatch({ type: FIND_CART_FAILURE, payload: error });
      console.error("Error finding cart:", error);
    }
  };

  export const getAllCartItems = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(`/api/cart/${reqData.cartId}/items`, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
      console.log("All Cart Items:", response.data);
    } catch (error) {
      dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
      console.error("Error getting all cart items:", error);
    }
  };


  export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
      const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
      console.log("Item Added to Cart:", data);
    } catch (error) {
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload:error.message});
      console.error("Error adding item to cart:", error);
    }
  };

  export const removeCartItem = (cartItemId, jwt) => async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
      const {data} = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
      console.log("Cart Item Removed:", data);
    } catch (error) {
      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error.message });
      console.error("Error removing cart item:", error);
    }
  };

  export const clearCartAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
      const {data}= await api.delete(`/api/cart/clear`,{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: CLEAR_CART_SUCCESS ,payload: data});
      console.log("Cart Cleared",data);
    } catch (error) {
      dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
      console.error("Error clearing cart:", error);
    }
  };

  export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });
    try {
      const { data } = await api.put(`/api/cart-item/update`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
      console.log("Updated Cart Item:", data);
    } catch (error) {
      dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
      console.error("Error updating cart item:", error);
    }
  };
  
  





