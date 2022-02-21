import { getToken } from "../../config";
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
                    console.log('register renponse', response.data)
                    dispatch(getAllProductCart(data.user_id))
                    dispatch({
                        type: `${ADD_PRODUCT_CART}_SUCCESS`,
                        payload: response.data.message
                    })
                },
                onError({getState, dispatch, error}){
                    console.log('error login', error.response)
                    dispatch({
                        type: `${ADD_PRODUCT_CART}_FAIL`,
                        error: ''
                    })
                }
            }
        }
    }
}