import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  productListSlice,
  productDetailSlice,
} from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  productList: productListSlice.reducer,
  productDetail: productDetailSlice.reducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const preloadedState = {};

const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  middleware: [thunkMiddleware],
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
