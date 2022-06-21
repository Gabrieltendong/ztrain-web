import { getToken, token } from "../../config";
import { SET_USER } from "../auth/type";
import { store } from "../configureStore";
import { 
    ADD_FAVORITE_CART,
    CREATE_COMMANDE, 
    GET_PRODUCT_CART, 
    GET_SHIPPING_METHOD, 
    REMOVE_PRODUCT_CART, 
    REMOVE__ALL_PRODUCT_CART,
    UPDATE_QUANTITY 
} from "./type";

export const getAllProductCart = (user_id) => {
    return {
        type: GET_PRODUCT_CART,
        payload: {
            request:{
                url:`/cart/${user_id}`,
                headers: {
                    "Authorization": getToken()
                },
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({
                        type: `${GET_PRODUCT_CART}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: SET_USER,
                        payload: {}
                    })
                    dispatch({
                        type: `${GET_PRODUCT_CART}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}

export const get_shipping_method_list = () => {
    return {
        type: GET_SHIPPING_METHOD,
        payload: {
            request:{
                url:`/shipping-method/`,
                headers: {
                    "Authorization": getToken()
                },
            }
        }
    }
}

export const updateQuantityProduct = (data) => {
    return {
        type: UPDATE_QUANTITY,
        payload: {
            request:{
                method: 'PUT',
                url:`/cart/update`,
                headers: {
                    "Authorization": getToken()
                },
                data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(getAllProductCart(data.user_id));
                    dispatch({
                        type: `${UPDATE_QUANTITY}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${UPDATE_QUANTITY}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}

export const removeProduct = (data) => {
    return {
        type: REMOVE_PRODUCT_CART,
        payload: {
            request:{
                method: 'DELETE',
                url:`/cart/delete`,
                headers: {
                    "Authorization": getToken()
                },
                data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(getAllProductCart(data.user_id))
                    dispatch({
                        type: `${REMOVE_PRODUCT_CART}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${REMOVE_PRODUCT_CART}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}

export const removeAllProduct = (user_id) => {
    return {
        type: REMOVE__ALL_PRODUCT_CART,
        payload: {
            request:{
                method: 'DELETE',
                url:`/cart/delete/${user_id}`,
                headers: {
                    "Authorization": getToken()
                }
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(getAllProductCart(user_id))
                    dispatch({
                        type: `${REMOVE__ALL_PRODUCT_CART}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${REMOVE__ALL_PRODUCT_CART}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}

export const createCommand = (data) => {
    return {
        type: CREATE_COMMANDE,
        payload: {
            request:{
                method: 'POST',
                url:`/command/create`,
                headers: {
                    "Authorization": getToken()
                },
                data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    const {user_id} = JSON.parse(data)
                    dispatch(getAllProductCart(user_id))
                    dispatch({
                        type: `${CREATE_COMMANDE}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${CREATE_COMMANDE}_FAIL`,
                        error: error.response.data.message
                    })
                }
            }
        }
    }
}

export const add_favorite_cart = () => {
    const user_id = store.getState().auth.login.data.user._id
    return {
        type: ADD_FAVORITE_CART,
        payload: {
            request:{
                method: 'POST',
                url:`/cart/add_favorite/${user_id}`,
                headers: {
                    "Authorization": getToken()
                }
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(getAllProductCart(user_id))
                    dispatch({
                        type: `${ADD_FAVORITE_CART}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${ADD_FAVORITE_CART}_FAIL`,
                        error: "erreur serveur"
                    })
                }
            }
        }
    }
}