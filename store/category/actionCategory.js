import { getToken } from "../../config"
import { SET_USER } from "../auth/type"
import { GET_PRODUCT } from "../product/type"
import { GET_CATEGORY, GET_PRODUCT_CATEGORY } from "./type"


export const get_all_category = () => {
    return {
        type: GET_CATEGORY,
        payload: {
            request:{
                url:`/category/active`,
                headers: {
                    "Authorization": getToken()
                }
            }
        }
    }
}

export const get_products_category = (category_id) => {
    return {
        type: GET_PRODUCT,
        payload: {
            request:{
                url:`/product/category/${category_id}`,
                headers: {
                    "Authorization": getToken()
                },
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