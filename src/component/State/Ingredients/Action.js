import { 
    CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, CREATE_INGREDIENT_FAILURE, 
    CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE,
    UPDATE_STOCK
} from './ActionType';
import { api } from '../../Config/api'; // Assuming you have a configured api instance

// Action to fetch ingredients
export const getIngredientsOfRestaurant = ({id,jwt}) => async (dispatch) => {
    
    try {
        const response = await api.get(`/api/admin/ingredients/restaurant/${id}`,
            {
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        }
    )
        dispatch({ type: GET_INGREDIENTS, payload: response.data });
        console.log('Ingredients fetched:', response.data);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
};

// Action to create a new ingredient
export const createIngredient = ({data, jwt}) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
        const response = await api.post(`/api/admin/ingredients`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
        console.log('Ingredient created:', data);
    } catch (error) {
        dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
        console.error('Error creating ingredient:', error);
    }
};

// Action to create a new ingredient category
export const createIngredientCategory = ({data, jwt}) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
        const response = await api.post(`/api/admin/ingredients/category`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        console.log('Ingredient category created:', data);
    } catch (error) {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
        console.error('Error creating ingredient category:', error);
    }
};

// Action to fetch ingredient categories
export const getIngredientCategories = ({id,jwt}) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
        const response= await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        console.log('Ingredient categories fetched:', response.data);
    } catch (error) {
        dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
        console.error('Error fetching ingredient categories:', error);
    }
};

// Action to update stock for an ingredient
export const updateStock = ({ingredientId, jwt}) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/admin/ingredients/${ingredientId}/stock`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: UPDATE_STOCK ,payload :data });
        console.log('Stock updated:', data);
    } catch (error) {
        console.error('Error updating stock:', error.message);
    }
};
