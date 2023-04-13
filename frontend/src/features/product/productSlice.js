import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../../constants/productConstants';

let baseURL = 'http://localhost:5000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://shoop.herokuapp.com';
}

// ********** product detail slice **********
export const productDetailSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_DETAIL_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_DETAIL_SUCCESS]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [PRODUCT_DETAIL_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productDetailRequest, productDetailSuccess, productDetailFail } =
  productDetailSlice.actions;

// ********** products detail action **********
export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch(productDetailRequest());
    const { data } = await axios.get(`${baseURL}/api/products/${id}`);
    console.log(data);
    dispatch(productDetailSuccess(data));
  } catch (error) {
    dispatch(productDetailFail(error.response.data.message));
  }
};

// ********** product list slice **********
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

export const { productListRequest, productListSuccess, productListFail } =
  productListSlice.actions;

// ********** product list action **********
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest());
    const { data } = await axios.get(`${baseURL}/api/products`);
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFail(error.message));
  }
};

// ********** product admin delete slice **********
export const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_ADMIN_DELETE_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_ADMIN_DELETE_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [PRODUCT_ADMIN_DELETE_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productAdminDeleteRequest,
  productAdminDeleteSuccess,
  productAdminDeleteFail,
} = productDeleteSlice.actions;

// ********** product admin delete action **********
export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch(productAdminDeleteRequest());
    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${baseURL}/api/products/${id}`,
      config
    );

    dispatch(productAdminDeleteSuccess(data));
  } catch (error) {
    dispatch(productAdminDeleteFail(error.response.data.message));
  }
};

// ********** product admin create slice **********
export const productAdminCreateSlice = createSlice({
  name: 'productCreate',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_ADMIN_CREATE_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_ADMIN_CREATE_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [PRODUCT_ADMIN_CREATE_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productAdminCreateRequest,
  productAdminCreateSuccess,
  productAdminCreateFail,
  productAdminCreateReset,
} = productAdminCreateSlice.actions;

// ********** product admin create action **********
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productAdminCreateRequest());
    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/products`,
      product,
      config
    );
    dispatch(productAdminCreateSuccess(data));
  } catch (error) {
    dispatch(productAdminCreateFail(error.response.data.message));
  }
};

// ********** product admin update slice **********
export const productAdminUpdateSlice = createSlice({
  name: 'productAdminUpdate',
  initialState: {
    productAdminUpdate: [],
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_ADMIN_UPDATE_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_ADMIN_UPDATE_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.productUpdate = action.payload;
    },
    [PRODUCT_ADMIN_UPDATE_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [PRODUCT_ADMIN_UPDATE_RESET]: (state) => {
      state.productUpdate = [];
    },
  },
});

export const {
  productAdminUpdateRequest,
  productAdminUpdateSuccess,
  productAdminUpdateFail,
  productAdminUpdateReset,
} = productAdminUpdateSlice.actions;

// ********** product admin update action **********
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productAdminUpdateRequest());
    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${baseURL}/api/products/${product._id}`,
      product,
      config
    );
    dispatch(productAdminUpdateSuccess(data));
  } catch (error) {
    dispatch(productAdminUpdateFail(error.response));
  }
};

// ********** product admin create review slice **********
export const productCreateReviewSlice = createSlice({
  name: 'productCreateReview',
  initialState: {
    productCreateReview: [],
    loading: false,
    error: null,
  },
  reducers: {
    [PRODUCT_CREATE_REVIEW_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_CREATE_REVIEW_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [PRODUCT_CREATE_REVIEW_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [PRODUCT_CREATE_REVIEW_RESET]: (state) => {
      state.productCreateReview = [];
    },
  },
});

export const {
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productCreateReviewReset,
} = productCreateReviewSlice.actions;

// ********** product admin create review action **********
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(productCreateReviewRequest());
      const token = getState().userLogin.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `${baseURL}/api/products/${productId}/reviews`,
        review,
        config
      );
      dispatch(productCreateReviewSuccess());
    } catch (error) {
      dispatch(productCreateReviewFail(error.response.data.message));
    }
  };
