import { FETCH_COMMANDES_REQUEST } from "./type";



export const fetchCommandes = (user_id) => {
    return {
        type: FETCH_COMMANDES_REQUEST,
        payload: {
            request:{
                method: 'GET',
                url:`/command/${user_id}`,
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({
                        type: `${FETCH_COMMANDES_REQUEST}_SUCCESS`,
                        payload: response.data
                    })
                    console.log('SEARCH FOR ORDERS WAS A SUCCESSFUL!', response.data); 
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${FETCH_COMMANDES_REQUEST}_FAIL`,
                        error: error.response.data.message
                       // console.log('SEARCH FOR ORDERS WAS A SUCCESSFUL failed.');
                    })
                    console.log('SEARCH FOR ORDERS WAS A SUCCESSFUL failed.');
                }
            }
        }
    }
}


