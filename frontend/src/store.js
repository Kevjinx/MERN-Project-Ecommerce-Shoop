import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import thunkMiddleware from 'redux-thunk';

const preloadedState = {};

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: [thunkMiddleware],
  devTools: true,
});

export default store;
