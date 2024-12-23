import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, SEARCH_RESTAURANT_REQUEST, SEARCH_RESTAURANT_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    // restaurant: null,
    loading: false,
    error: null,
    categories: [],
    searchResults: [],
}

export const restaurantReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_RESTAURANT_REQUEST:
        case GET_ALL_RESTAURANT_REQUEST:
        case DELETE_RESTAURANT_REQUEST:
        case UPDATE_RESTAURANT_REQUEST:
        case GET_RESTAURANT_BY_ID_REQUEST:
        case CREATE_CATEGORY_REQUEST:
        case GET_RESTAURANTS_CATEGORY_REQUEST:
        case SEARCH_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,

            };

        case GET_ALL_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
            };
        case GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,

            };
       
        case GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case UPDATE_RESTAURANT_STATUS_SUCCESS:
        case UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,
                
            }

            case SEARCH_RESTAURANT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    restaurant: action.payload,
                };
            case DELETE_RESTAURANT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    restaurants: state.restaurants.filter(
                        (item) => item.id !== action.payload
                    ),
                    usersRestaurant: state.usersRestaurants.filter(
                        (item) => item.id !== action.payload
                    ),
                    error: null
                };
                case CREATE_CATEGORY_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        categories: [...state.categories,action.payload],
                        
                    };

                    case GET_RESTAURANTS_CATEGORY_SUCCESS:
        
                    return {
                        ...state,
                        loading: false,
                        categories: action.payload,
                    };
                        case CREATE_RESTAURANT_FAILURE:
                        case GET_ALL_RESTAURANT_FAILURE:
                        case DELETE_RESTAURANT_FAILURE:
                        case UPDATE_RESTAURANT_FAILURE:
                        case GET_RESTAURANT_BY_ID_FAILURE:
                        case CREATE_CATEGORY_FAILURE:
                        case GET_RESTAURANTS_CATEGORY_FAILURE:
                            return {
                                ...state,
                                loading: false,
                                error: action.payload
                            };


        default:
            return state;
    }

}

export default restaurantReducer;