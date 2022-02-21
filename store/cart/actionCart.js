import { getToken, token } from "../../config";
import { store } from "../configureStore";
import { GET_PRODUCT_CART, REMOVE_PRODUCT_CART, UPDATE_QUANTITY } from "./type";

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
                    console.log('error login', error.response)
                    dispatch({
                        type: `${REMOVE_PRODUCT_CART}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}