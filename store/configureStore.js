import {createStore, applyMiddleware, combineReducers} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import authReducer from './auth/reducerAuth';
import productReducer from './product/reducerProduct';

const client = axios.create({
  baseURL: process.env.baseUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer
})

let store = createStore(
  rootReducer, 
  applyMiddleware(
    axiosMiddleware(client)
  )
)

export {
    store
}