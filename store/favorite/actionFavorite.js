import { getToken } from "../../config"
import { store } from "../configureStore"
import { LIST_FAVORITE, TOGGLE_FAVORITE } from "./type"


export const toggle_favorite = (data) => {
    return {
        type: TOGGLE_FAVORITE,
        payload: {
            request:{
                method: 'POST',
                url:`/favorites/add`,
                headers: {
                    "Authorization": getToken()
                },
                data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(get_all_favorites())
                    dispatch({
                        type: `${TOGGLE_FAVORITE}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${TOGGLE_FAVORITE}_FAIL`,
                        error: error.response.data.message
                    })
                }
            }
        }
    }
}

export const get_all_favorites = () => {
    const user_id = store.getState().auth.login.data.user._id
    return {
        type: LIST_FAVORITE,
        payload: {
            request:{
                url:`/favorites/${user_id}`,
                headers: {
                    "Authorization": getToken()
                },
            }
        }
    }
}