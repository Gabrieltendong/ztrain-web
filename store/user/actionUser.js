
import { notification } from "antd";
import { setUser } from "../auth/actionAuth";
import { UPDATE_USER, UPDATE_USER_PASSWORD } from "./type";




export const updateuser = (data, _id) => {
    return {
        type: UPDATE_USER,
        payload: {
            request:{
                method: 'PATCH',
                url:`/user/${_id}`,
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    notification.success({
                        message: 'Votre profile a été mis à jour avec succes',
                    });
                    dispatch({
                        type: `${UPDATE_USER}_SUCCESS`,
                        payload: response.data
                    })
                    dispatch(setUser(response.data))
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${UPDATE_USER}_FAIL`,
                        error: error.response.data.message
                       // console.log('User update failed.');
                    })
                    console.log('User update failed.');
                }
            }
        }
    }
}

export const updateuserPassword = (data, _id) => {
    return {
        type: UPDATE_USER_PASSWORD,
        payload: {
            request:{
                method: 'PATCH',
                url:`/user/update_password/${_id}`,
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log("change password", response.data)
                    if(response.data.error){
                        notification.error({
                            message: response.data.error,
                        });
                    }else{
                        notification.success({
                            message: 'Votre mot de passe a été mis à jour avec succes',
                        });
                    }
                    dispatch({
                        type: `${UPDATE_USER_PASSWORD}_SUCCESS`,
                        payload: response.data
                    })
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${UPDATE_USER_PASSWORD}_FAIL`,
                        error: error.response.data.message
                       // console.log('User update failed.');
                    })
                    console.log('User update failed.');
                }
            }
        }
    }
}


