import { getToken } from "../../config"
import { GET_PROMO_CODE } from "./type"


export const getPromoCode = (code) => {
    return {
        type: GET_PROMO_CODE,
        payload: {
            request:{
                url:`/promo-code/${code}`,
                headers: {
                    "Authorization": getToken()
                }
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({
                        type: `${GET_PROMO_CODE}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    console.log('error', error.response.status)
                    if(error.response.status == 403){
                        dispatch({
                            type: `${GET_PROMO_CODE}_FAIL`,
                            error: "Ce code promo a déjà expiré"
                        })
                    }else{
                        dispatch({
                            type: `${GET_PROMO_CODE}_FAIL`,
                            error: "Ce code promo n'est pas valide"
                        })
                    }
                }
            }
        }
    }
}