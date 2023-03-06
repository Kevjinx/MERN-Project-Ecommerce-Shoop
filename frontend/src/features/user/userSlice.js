import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_ERROR_RESET,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConstants.js';

// TODO: refactor these user slices into multiple files. BUT, should I tho?

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
    [USER_LOGIN_ERROR_RESET]: (state) => {
      state.error = null;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userLoginErrorReset,
} = userLoginSlice.actions;

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

// ************** user register slice **************
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

// ************** user register action **************
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

// ************** user detail slice **************
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

// ************** user update profile slice **************
export const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    [USER_UPDATE_PROFILE_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_UPDATE_PROFILE_SUCCESS]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [USER_UPDATE_PROFILE_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [USER_UPDATE_PROFILE_RESET]: (state) => {
      state.user = {};
    },
  },
});

export const {
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
  userUpdateProfileReset,
} = userUpdateProfileSlice.actions;

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest());

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/users/profile`,
      user,
      config
    );

    dispatch(userUpdateProfileSuccess(data));
  } catch (error) {
    dispatch(userUpdateProfileFail(error.response));
  }
};
