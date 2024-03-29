import {createStore, applyMiddleware, combineReducers} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createFilter, createBlacklistFilter} from 'redux-persist-transform-filter';

import authReducer from './auth/reducerAuth';
import productReducer from './product/reducerProduct';
import cartReducer from './cart/reducerCart';
import favoriteReducer from './favorite/reducerFavorite';
import categoryReducer from './category/reducerCategory';
import promoCodeReducer from './promo_code/reducerPromoCode';
import userReducer from './user/reducerUser';
import commandeReducer from './commandes/commandeReducer';

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
  whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    category: categoryReducer,
    promo_code: promoCodeReducer,
    commandes : commandeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
  persistedReducer, 
  applyMiddleware(
    thunk,
    axiosMiddleware(client)
  )
)

let persistor = persistStore(store)

export {
    store,
    persistor
}