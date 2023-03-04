import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../../constants/userConstants.js';

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

export default userLoginSlice.reducer;

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

export const logout = () => (dispatch) => {
  dispatch(userLogout());
};
