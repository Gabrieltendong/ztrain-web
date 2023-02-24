
import { UPDATE_USER } from "./type";




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
                    dispatch({
                        type: `${UPDATE_USER}_SUCCESS`,
                        payload: response.data
                    })
                    console.log('User updated successfully!', response.data); 
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


