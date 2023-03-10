import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  productListSlice,
  productDetailSlice,
} from './features/product/productSlice';
import {
  userLoginSlice,
  userDetailSlice,
  userRegisterSlice,
  userUpdateProfileSlice,
} from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import {
  orderCreateSlice,
  orderDetailsSlice,
  orderPaySlice,
  orderListMySlice,
  orderListSlice,
  orderDeliverSlice,
} from './features/order/orderSlice';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userDetail'],
  //TODO: update whitelist when in production
};

const rootReducer = combineReducers({
  productList: productListSlice.reducer,
  productDetail: productDetailSlice.reducer,
  cart: cartReducer,
  userLogin: userLoginSlice.reducer,
  userDetail: userDetailSlice.reducer,
  userRegister: userRegisterSlice.reducer,
  userUpdateProfile: userUpdateProfileSlice.reducer,
  orderCreate: orderCreateSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  orderPay: orderPaySlice.reducer,
  orderListMy: orderListMySlice.reducer,
  orderList: orderListSlice.reducer,
  orderDeliver: orderDeliverSlice.reducer,
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
