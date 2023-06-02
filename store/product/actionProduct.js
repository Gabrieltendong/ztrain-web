import { getToken } from "../../config";
import { SET_USER } from "../auth/type";
import { notification } from 'antd';
import { store } from "../configureStore";
import { ADD_PRODUCT_CART, CLEAR_CART, DECREMENT_PRODUCT, DELETE_PRODUCT_CART, GET_PRODUCT, INCREMENT_PRODUCT } from "./type";

export const getAllProduct = () => {
    return {
        type: GET_PRODUCT,
        payload: {
            request:{
                url:'/product/',
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

export const addProductCart = (data) => (dispatch) => {
    let product_cart = store.getState().product.product_cart
    const index = product_cart.findIndex(item => item.product.id == data.product.id)
    if(index != -1){
        notification.success({
            message: 'Quantité du produit mis à jour',
           
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        product_cart[index].quantity = product_cart[index].quantity + data.quantity
        dispatch({
            type: `${ADD_PRODUCT_CART}`,
            payload: product_cart
        })
    }else{
        notification.success({
            message: 'Ajout produit au panier',
            
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        dispatch({
            type: `${ADD_PRODUCT_CART}`,
            payload: [...product_cart, data]
        })
    }
}

export const decrementProductCart = (product_id) => (dispatch) => {
        dispatch({
            type: DECREMENT_PRODUCT,
            payload: product_id
        })
}

export const incrementProductCart = (product_id) => (dispatch) => {
    dispatch({
        type: INCREMENT_PRODUCT,
        payload: product_id
    })
}

export const deleteProductCart = (product_id) => (dispatch) => {
    dispatch({
        type: DELETE_PRODUCT_CART,
        payload: product_id
    })
}

export const deleteAllProductCart = () => (dispatch) => {
    dispatch({
        type: CLEAR_CART
    })
}