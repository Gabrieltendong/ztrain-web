
import { LOGIN, REGISTER, SET_USER } from "./type";

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
                    console.log('error login')
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
                    console.log('register renponse', response.data)
                    dispatch(setUser(response.data))
                    dispatch({
                        type: `${REGISTER}_SUCCESS`,
                        payload: response.data
                    })
                    router.push('/home')
                },
                onError({getState, dispatch, error}){
                    console.log('error login', error.response)
                    dispatch({
                        type: `${REGISTER}_FAIL`,
                        error: error.response.data.message
                    })
                }
            }
        }
    }
}