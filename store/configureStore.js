import {createStore, applyMiddleware, combineReducers} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createFilter, createBlacklistFilter} from 'redux-persist-transform-filter';

import authReducer from './auth/reducerAuth';
import productReducer from './product/reducerProduct';
import cartReducer from './cart/reducerCart';
import favoriteReducer from './favorite/reducerFavorite';

const persitingAuth = createBlacklistFilter(
  `auth`,
  ['register']
);

const client = axios.create({
  baseURL: process.env.baseUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'user_infos']
}

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
  persistedReducer, 
  applyMiddleware(
    axiosMiddleware(client)
  )
)

let persistor = persistStore(store)

export {
    store,
    persistor
}