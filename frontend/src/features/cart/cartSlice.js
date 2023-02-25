import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.product !== productId);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
