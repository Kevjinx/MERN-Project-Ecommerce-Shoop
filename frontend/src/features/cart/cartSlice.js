import { createSlice } from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
} from '../../constants/cartConstants.js';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
  },
  reducers: {
    [ADD_TO_CART]: (state, action) => {
      const product = action.payload;
      const itemInCart = state.cartProducts.find(
        (cartProduct) => cartProduct._id === product._id
      );

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartProducts.push({ ...product, quantity: 1 });
      }
    },

    [REMOVE_FROM_CART]: (state, action) => {
      const product = action.payload;
      const existingProducts = state.cartProducts.find(
        (cartProduct) => cartProduct._id === product._id
      );
      existingProducts.quantity = 0;
    },
    [INCREMENT_QUANTITY]: (state, action) => {
      const product = action.payload;
      const existingProducts = state.cartProducts.find(
        (cartProduct) => cartProduct._id === product._id
      );
      existingProducts.quantity++;
    },
    [DECREMENT_QUANTITY]: (state, action) => {
      const product = action.payload;
      const existingProducts = state.cartProducts.find(
        (cartProduct) => cartProduct._id === product._id
      );
      existingProducts.quantity > 0 && existingProducts.quantity--;
    },
    [CLEAR_CART]: (state) => {
      state.cartProducts = [];
    },
    [SAVE_SHIPPING_ADDRESS]: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
