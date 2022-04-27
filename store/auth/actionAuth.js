
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

export const google_login = () => {
    return {
        type: LOGIN,
        payload: {
            request:{
                url:'/user/auth/google'
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log("response google auth", response.data)
                    // dispatch(setUser(response.data))
                    // dispatch({
                    //     type: `${LOGIN}_SUCCESS`,
                    //     payload: response.data
                    // })
                    // router.push('/home')
                },
                onError({getState, dispatch, error}){
                    console.log("error google auth", error)
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
                        dispatch({
                            type: `${RESET_PASSWORD}_SUCCESS`,
                            payload: response.data.message
                        })
                        setTimeout(() => {
                            router.push('/auth/login')
                        }, 2000);
                    }
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${RESET_PASSWORD}_FAIL`,
                        error: error.response.data.message
                    })
                }
            }
        }
    }
}