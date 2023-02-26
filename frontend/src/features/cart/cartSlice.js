import { createSlice } from '@reduxjs/toolkit';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../constants/cartConstants';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
  },
  reducers: {
    [ADD_TO_CART]: (state, action) => {
      const productId = action.payload;

      const existingProducts = state.cartProducts.find(
        (cartProductId) => cartProductId === productId
      );

      existingProducts
        ? (existingProducts.quantity += 1)
        : state.cartProducts.push(productId);
    },

    [REMOVE_FROM_CART]: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartProductId) => cartProductId !== productId
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
