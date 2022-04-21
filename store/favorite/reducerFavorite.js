import { 
    LIST_FAVORITE, 
    TOGGLE_FAVORITE 
} from "./type";

const initialState = {
    toggle_Favorite: {
        data: {},
        isLoading: false,
        error: ""
    },
    list_favorite: {
        data: [],
        isLoading: false,
        error: ""
    },
}

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            return {
                ...state,
                toggle_Favorite: {
                    ...state.toggle_Favorite,
                    isLoading: true
                }
            }
        case `${TOGGLE_FAVORITE}_SUCCESS`:
            return {
                ...state,
                toggle_Favorite: {
                    ...state.toggle_Favorite,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${TOGGLE_FAVORITE}_FAIL`:
            return {
                ...state,
                toggle_Favorite: {
                    ...state.toggle_Favorite,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        case LIST_FAVORITE:
            return {
                ...state,
                list_favorite: {
                    ...state.list_favorite,
                    isLoading: true
                }
            }
        case `${LIST_FAVORITE}_SUCCESS`:
            return {
                ...state,
                list_favorite: {
                    ...state.list_favorite,
                    isLoading: false,
                    data: action.payload.data,
                    error: ""
                }
            }
        case `${LIST_FAVORITE}_FAIL`:
            return {
                ...state,
                list_favorite: {
                    ...state.list_favorite,
                    isLoading: false,
                    data: [],
                    error: "probleme sur le serveur"
                }
            }
        default:
            return state;
    }
}

export default favoriteReducer;