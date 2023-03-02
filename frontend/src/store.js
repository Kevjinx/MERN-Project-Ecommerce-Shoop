import { configureStore } from '@reduxjs/toolkit';
import {
  productListSlice,
  productDetailSlice,
} from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import thunkMiddleware from 'redux-thunk';

const preloadedState = {};

const store = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    productDetail: productDetailSlice.reducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: [thunkMiddleware],
  devTools: true,
});

export default store;
