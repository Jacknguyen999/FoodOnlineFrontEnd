import { 
    CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, CREATE_INGREDIENT_FAILURE, 
    CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE,
    UPDATE_STOCK
} from './ActionType';

const initialState = {
    ingredients: [],            // Stores the list of ingredients
    category: [],   // Stores the list of ingredient categories
    update: null,        // Tracks whether stock was updated
};

const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        
        // Success actions for creating an ingredient
        case CREATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload], // Add new ingredient
                message: 'Ingredient created successfully!',
            };

        // Success actions for creating an ingredient category
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: [...state.category,action.payload], // Add new category
            };

        // Success action for fetching ingredients
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload, // Set fetched ingredients
            };

        // Success action for fetching ingredient categories
        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload, 
            };
        // Success action for updating stock
        case UPDATE_STOCK:
            return {
                ...state,
                update: action.payload, // Indicate stock was updated
                ingredients: state.ingredients.map((item)=>
                item.id ===action.payload.id ? action.payload : item
                )
            };

        // Failure actions for handling errors
        
        default:
            return state;
    }
};

export default ingredientReducer;
