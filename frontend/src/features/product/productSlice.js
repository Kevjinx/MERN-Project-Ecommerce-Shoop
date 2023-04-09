import { createSlice } from '@reduxjs/toolkit';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from '../../constants/productConstants';

let baseURL = 'http://localhost:5000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://shoop.herokuapp.com';
}

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    productDetail: [],
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_DETAIL_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_DETAIL_SUCCESS]: (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
    [PRODUCT_DETAIL_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    productList: [],
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_LIST_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_LIST_SUCCESS]: (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    },
    [PRODUCT_LIST_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productDetailRequest, productDetailSuccess, productDetailFail } =
  productDetailSlice.actions;

export const { productListRequest, productListSuccess, productListFail } =
  productListSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest());
    const response = await fetch(`${baseURL}/api/bikes`);
    const data = await response.json();
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFail(error.message));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch(productDetailRequest());
    const response = await fetch(`${baseURL}/api/bikes/${id}`);
    const data = await response.json();
    dispatch(productDetailSuccess(data));
  } catch (error) {
    dispatch(productDetailFail(error.message));
  }
};
