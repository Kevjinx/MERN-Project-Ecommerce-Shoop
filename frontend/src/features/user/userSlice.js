import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
} from '../../constants/userConstants.js';

// TODO: refactor these user slices into multiple files

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    userInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    [USER_LOGIN_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_LOGIN_SUCCESS]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [USER_LOGIN_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [USER_LOGOUT]: (state) => {
      state.userInfo = {};
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } =
  userLoginSlice.actions;

export const fetchUserLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    );

    console.log(data);

    dispatch(userLoginSuccess(data));
    //use redux persist to store user info in local storage
    console.log('login success');
  } catch (error) {
    dispatch(userLoginFail(error.response));
  }
};

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    userInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    [USER_REGISTER_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_REGISTER_SUCCESS]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [USER_REGISTER_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } =
  userRegisterSlice.actions;

export const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch(userRegisterRequest());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/users',
        { firstName, lastName, email, password },
        config
      );

      dispatch(userRegisterSuccess(data));
      console.log('register success');
    } catch (error) {
      dispatch(userRegisterFail(error.response));
    }
  };

//update user profile
export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    [USER_DETAIL_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_DETAIL_SUCCESS]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [USER_DETAIL_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userDetailRequest, userDetailSuccess, userDetailFail } =
  userDetailSlice.actions;

export const fetchUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailRequest());

    const token = getState().userLogin.userInfo.token;
    console.log(token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    );

    dispatch(userDetailSuccess(data));
  } catch (error) {
    dispatch(userDetailFail(error.response));
  }
};
