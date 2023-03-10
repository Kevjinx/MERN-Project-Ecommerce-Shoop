import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants';
import { clearCart } from '../cart/cartSlice';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

export const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState: {},
  reducers: {
    [ORDER_CREATE_REQUEST]: (state) => {
      state.loading = true;
    },
    [ORDER_CREATE_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    [ORDER_CREATE_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [ORDER_CREATE_RESET]: (state) => {
      state = {};
    },
  },
});

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderCreateReset,
} = orderCreateSlice.actions;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest());
    console.log(order);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/orders`,
      order,
      config
    );
    dispatch(orderCreateSuccess(data));
    dispatch(clearCart());
  } catch (error) {
    dispatch(orderCreateFail(error.message));
  }
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: { loading: true, orderItems: [], shippingAddress: {} },
  reducers: {
    [ORDER_DETAILS_REQUEST]: (state) => {
      state.loading = true;
    },
    [ORDER_DETAILS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [ORDER_DETAILS_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } =
  orderDetailsSlice.actions;

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    );
    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    dispatch(orderDetailsFail(error.message));
  }
};

export const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {},
  reducers: {
    [ORDER_PAY_REQUEST]: (state) => {
      state.loading = true;
    },
    [ORDER_PAY_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [ORDER_PAY_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [ORDER_PAY_RESET]: (state) => {
      state = {};
    },
  },
});

export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } =
  orderPaySlice.actions;

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch(orderPaySuccess(data));
    } catch (error) {
      dispatch(orderPayFail(error.message));
    }
  };

export const orderListMySlice = createSlice({
  name: 'orderListMy',
  initialState: { orders: [] },
  reducers: {
    [ORDER_LIST_MY_REQUEST]: (state) => {
      state.loading = true;
    },
    [ORDER_LIST_MY_SUCCESS]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [ORDER_LIST_MY_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [ORDER_LIST_MY_RESET]: (state) => {
      state = { orders: [] };
    },
  },
});

export const { orderListMyRequest, orderListMySuccess, orderListMyFail } =
  orderListMySlice.actions;

export const getListMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListMyRequest());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/myorders`,
      config
    );

    dispatch(orderListMySuccess(data));
  } catch (error) {
    dispatch(orderListMyFail(error.message));
  }
};

export const orderListSlice = createSlice({
  name: 'orderList',
  initialState: { orders: [] },
  reducers: {
    [ORDER_LIST_REQUEST]: (state) => {
      state.loading = true;
    },
    [ORDER_LIST_SUCCESS]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [ORDER_LIST_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { orderListRequest, orderListSuccess, orderListFail } =
  orderListSlice.actions;

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch(orderListRequest());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/orders`,
      config
    );

    dispatch(orderListSuccess(data));
  } catch (error) {
    dispatch(orderListFail(error.message));
  }
};

export const orderDeliverSlice = createSlice({
  name: 'orderDeliver',
  initialState: {},
  reducers: {
    [ORDER_DELIVER_REQUEST]: (state) => {
      state.loading = true;
    },
    [ORDER_DELIVER_SUCCESS]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [ORDER_DELIVER_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [ORDER_DELIVER_RESET]: (state) => {
      state = {};
    },
  },
});

export const { orderDeliverRequest, orderDeliverSuccess, orderDeliverFail } =
  orderDeliverSlice.actions;

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverRequest());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${order._id}/deliver`,
      {},
      config
    );
    dispatch(orderDeliverSuccess(data));
  } catch (error) {
    dispatch(orderDeliverFail(error.message));
  }
};
