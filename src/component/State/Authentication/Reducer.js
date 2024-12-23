import { isPresentInFavorites } from "../../Config/logic";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, CHANGE_ROLE_FAILURE, CHANGE_ROLE_REQUEST, CHANGE_ROLE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user : null,
    isLoading : false,
    error : null,
    jwt : null,
    favorites : [],
    success : null,
}

export const authReducer = (state =initialState,action) =>{

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            case CHANGE_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error : null,
                success : null,
            }
        
            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
                return{
                    ...state,
                    isLoading: false,
                    jwt : action.payload,
                    success : "Register success"
                }

                case GET_USER_SUCCESS:
                    return{
                        ...state,
                        isLoading: false,
                        user : action.payload,
                        favorites  : action.payload.favorites

                        
                    }

                    case CHANGE_ROLE_SUCCESS:
                                // return { ...state, isLoading: false, user: { ...state.user, role: action.payload.role } };

                        localStorage.setItem('jwt',action.payload.jwt)
            return {
                 ...state, 
                 sLoading: false,
                user: { ...state.user,
                     role: action.payload.role 
                    },
                    jwt: action.payload.jwt,
                    success: "Role changed successfully",
                };
                     
            case ADD_TO_FAVORITE_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    favorites : isPresentInFavorites(state.favorites,action.payload)
                    ?state.favorites.filter((item)=>item.id!==action.payload.id)
                    :[action.payload,...state.favorites]
                };
        case LOGOUT: 
        return initialState;
        
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            case CHANGE_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error : action.payload,
                success : null,
            }

        default:
            return state;
    }

}




