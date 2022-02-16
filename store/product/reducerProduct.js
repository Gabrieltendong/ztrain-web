import { ADD_PRODUCT_CART, GET_PRODUCT} from "./type";

const initialState = {
    list_product: {
        data: [],
        isLoading: false,
        error: ""
    },
    add_product_cart: {
        data: {},
        isLoading: false,
        error: ""
    }
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                list_product: {
                    ...state.list_product,
                    isLoading: true
                }
            }
        case `${GET_PRODUCT}_SUCCESS`:
            return {
                ...state,
                list_product: {
                    ...state.list_product,
                    isLoading: false,
                    data: action.payload.data,
                    error: ""
                }
            }
        case `${GET_PRODUCT}_FAIL`:
            return {
                ...state,
                list_product: {
                    ...state.list_product,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        case ADD_PRODUCT_CART:
            return {
                ...state,
                add_product_cart: {
                    ...state.add_product_cart,
                    isLoading: true
                }
            }
        case `${ADD_PRODUCT_CART}_SUCCESS`:
            return {
                ...state,
                add_product_cart: {
                    ...state.add_product_cart,
                    isLoading: false,
                    data: action.payload.data,
                    error: ""
                }
            }
        case `${ADD_PRODUCT_CART}_FAIL`:
            return {
                ...state,
                add_product_cart: {
                    ...state.add_product_cart,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        default:
            return state;
    }
}

export default productReducer;