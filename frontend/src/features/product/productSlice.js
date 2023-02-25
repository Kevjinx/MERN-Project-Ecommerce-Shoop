import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    productRequest(state) {
      state.loading = true;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productRequest, productSuccess, productFail } =
  productSlice.actions;
export default productSlice.reducer;
