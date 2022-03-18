import { getToken } from "../../config";
import { SET_USER } from "../auth/type";
import { getAllProductCart } from "../cart/actionCart";
import { GET_PRODUCT_CART } from "../cart/type";
import { ADD_PRODUCT_CART, GET_PRODUCT } from "./type";

export const getAllProduct = () => {
    return {
        type: GET_PRODUCT,
        payload: {
            request:{
                url:'/product/',
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({
                        type: `${GET_PRODUCT}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: SET_USER,
                        payload: {}
                    })
                    dispatch({
                        type: `${GET_PRODUCT}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}

export const addProductCart = (data) => {
    return {
        type: ADD_PRODUCT_CART,
        payload: {
            request:{
                method: 'POST',
                url:'/cart/add/',
                headers: {
                    "Authorization": getToken()
                },
                data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(getAllProductCart(data.user_id))
                    dispatch({
                        type: `${ADD_PRODUCT_CART}_SUCCESS`,
                        payload: response.data.message
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${ADD_PRODUCT_CART}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}