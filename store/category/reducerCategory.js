import { 
    GET_CATEGORY, 
    GET_PRODUCT_CATEGORY 
} from "./type";

const initialState = {
    list_category: {
        data: [],
        isLoading: false,
        error: ""
    },
    products_catgory: {
        data: [],
        isLoading: false,
        error: ""
    },
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                list_category: {
                    ...state.list_category,
                    isLoading: true
                }
            }
        case `${GET_CATEGORY}_SUCCESS`:
            return {
                ...state,
                list_category: {
                    ...state.list_category,
                    isLoading: false,
                    data: action.payload.data,
                    error: ""
                }
            }
        case `${GET_CATEGORY}_FAIL`:
            return {
                ...state,
                list_category: {
                    ...state.list_category,
                    isLoading: false,
                    data: [],
                    error: "probleme sur le serveur"
                }
            }
        case GET_PRODUCT_CATEGORY:
            return {
                ...state,
                products_catgory: {
                    ...state.products_catgory,
                    isLoading: true
                }
            }
        case `${GET_PRODUCT_CATEGORY}_SUCCESS`:
            return {
                ...state,
                products_catgory: {
                    ...state.products_catgory,
                    isLoading: false,
                    data: action.payload.data,
                    error: ""
                }
            }
        case `${GET_PRODUCT_CATEGORY}_FAIL`:
            return {
                ...state,
                products_catgory: {
                    ...state.products_catgory,
                    isLoading: false,
                    data: [],
                    error: "probleme sur le serveur"
                }
            }
        default:
            return state;
    }
}

export default categoryReducer;