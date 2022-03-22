
import { LOGIN, REGISTER, RESET_PASSWORD, SET_USER } from "./type";

const setUser = (data) => {
    return{
        type: SET_USER,
        payload: data
    }
}

export const auth = (data, router) => {
    return {
        type: LOGIN,
        payload: {
            request:{
                method: 'POST',
                url:'/auth/login/',
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(setUser(response.data))
                    dispatch({
                        type: `${LOGIN}_SUCCESS`,
                        payload: response.data
                    })
                    router.push('/home')
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${LOGIN}_FAIL`,
                    })
                }
            }
        }
    }
}

export const register = (data, router) => {
    return {
        type: REGISTER,
        payload: {
            request:{
                method: 'POST',
                url:'/user/register/',
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({
                        type: `${REGISTER}_SUCCESS`,
                        payload: response.data
                    })
                    dispatch(auth(data, router))
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${REGISTER}_FAIL`,
                        error: error.response.data.message
                    })
                }
            }
        }
    }
}

export const resetPassword = (data, router) => {
    return {
        type: RESET_PASSWORD,
        payload: {
            request:{
                method: 'PUT',
                url:'/user/resetpassword/',
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    
                    if(response.data.message){
                        console.log('resetpass renponse', response.data)
                        dispatch({
                            type: `${RESET_PASSWORD}_SUCCESS`,
                            payload: response.data.message
                        })
                        router.push('/auth/login')
                    }
                },
                onError({getState, dispatch, error}){
                    console.log('error resetpass', error.response.data)
                    dispatch({
                        type: `${RESET_PASSWORD}_FAIL`,
                        error: error.response.data.message
                    })
                }
            }
        }
    }
}