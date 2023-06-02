import { ADD_PRODUCT_CART, CLEAR_CART, DECREMENT_PRODUCT, DELETE_PRODUCT_CART, GET_PRODUCT, INCREMENT_PRODUCT} from "./type";

const initialState = {
    list_product: {
        data: [],
        isLoading: false,
        error: ""
    },
    product_cart: []
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
                    data: action.payload,
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
            console.log("payload", action.payload)
            return {
                ...state,
                product_cart: action.payload
            }
        case INCREMENT_PRODUCT:
            return {
                ...state,
                product_cart: state.product_cart.map(item => {
                    if(item.product.id == action.payload){
                        return{
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }else{
                        return item
                    }
                })
            }
        case DECREMENT_PRODUCT:
            return {
                ...state,
                product_cart: state.product_cart.map((item, index) => {
                    if(item.product.id == action.payload){
                        if(item.quantity == 1){
                            return item;
                        }else{
                            return{
                                ...item,
                                quantity: item.quantity - 1
                            }
                        }
                    }else{
                        return item
                    }
                })
            }
        case DELETE_PRODUCT_CART:
            return {
                ...state,
                product_cart: state.product_cart.filter((item, index) => item.product.id != action.payload)
            }
        case CLEAR_CART:
            return {
                ...state,
                product_cart: []
            }
        default:
            return state;
    }
}

export default productReducer;