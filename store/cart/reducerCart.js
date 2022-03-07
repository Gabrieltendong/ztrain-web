import { CREATE_COMMANDE, GET_PRODUCT_CART, REMOVE_PRODUCT_CART, REMOVE__ALL_PRODUCT_CART, UPDATE_QUANTITY} from "./type";

const initialState = {
    products_cart: {
        data: [],
        isLoading: false,
        error: ""
    },
    product: {
        data: {},
        isLoading: false,
        error: ""
    },
    removeProduct: {
        data: {},
        isLoading: false,
        error: ""
    },
    clearCart:{
        data: {},
        isLoading: false,
        error: ""
    },
    command: {
        data: {},
        isLoading: false,
        error: ""
    }
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_CART:
            return {
                ...state,
                products_cart: {
                    ...state.products_cart,
                    isLoading: true
                }
            }
        case `${GET_PRODUCT_CART}_SUCCESS`:
            return {
                ...state,
                products_cart: {
                    ...state.products_cart,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${GET_PRODUCT_CART}_FAIL`:
            return {
                ...state,
                products_cart: {
                    ...state.products_cart,
                    isLoading: false,
                    data: [],
                    error: "probleme sur le serveur"
                }
            }
        case UPDATE_QUANTITY:
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoading: true
                }
            }
        case `${UPDATE_QUANTITY}_SUCCESS`:
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoading: false,
                    data: action.payload.data,
                    error: ""
                }
            }
        case `${UPDATE_QUANTITY}_FAIL`:
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        case REMOVE_PRODUCT_CART:
            return {
                ...state,
                removeProduct: {
                    ...state.removeProduct,
                    isLoading: true
                }
            }
        case `${REMOVE_PRODUCT_CART}_SUCCESS`:
            return {
                ...state,
                removeProduct: {
                    ...state.removeProduct,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${REMOVE_PRODUCT_CART}_FAIL`:
            return {
                ...state,
                removeProduct: {
                    ...state.removeProduct,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        case REMOVE__ALL_PRODUCT_CART:
            return {
                ...state,
                clearCart: {
                    ...state.clearCart,
                    isLoading: true
                }
            }
        case `${REMOVE__ALL_PRODUCT_CART}_SUCCESS`:
            return {
                ...state,
                clearCart: {
                    ...state.clearCart,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${REMOVE__ALL_PRODUCT_CART}_FAIL`:
            return {
                ...state,
                clearCart: {
                    ...state.clearCart,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        case CREATE_COMMANDE:
            return {
                ...state,
                command: {
                    ...state.command,
                    isLoading: true
                }
            }
        case `${CREATE_COMMANDE}_SUCCESS`:
            return {
                ...state,
                command: {
                    ...state.command,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${CREATE_COMMANDE}_FAIL`:
            return {
                ...state,
                command: {
                    ...state.command,
                    isLoading: false,
                    data: {},
                    error: "probleme sur le serveur"
                }
            }
        default:
            return state;
    }
}

export default cartReducer;