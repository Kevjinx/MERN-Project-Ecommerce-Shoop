import { createSlice } from '@reduxjs/toolkit';
import {
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
} from '../../constants/productConstants';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_SUCCESS]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [PRODUCT_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productRequest, productSuccess, productFail } =
  productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(productRequest());
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.message));
  }
};

export default productSlice.reducer;
