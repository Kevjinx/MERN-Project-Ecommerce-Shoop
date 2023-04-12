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
  USER_DETAIL_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_ADMIN_GET_ALL_USERS_REQUEST,
  USER_ADMIN_GET_ALL_USERS_SUCCESS,
  USER_ADMIN_GET_ALL_USERS_FAIL,
  USER_ADMIN_GET_ALL_USERS_RESET,
  USER_ADMIN_DELETE_BY_ID_REQUEST,
  USER_ADMIN_DELETE_BY_ID_SUCCESS,
  USER_ADMIN_DELETE_BY_ID_FAIL,
  USER_ADMIN_UPDATE_BY_ID_REQUEST,
  USER_ADMIN_UPDATE_BY_ID_SUCCESS,
  USER_ADMIN_UPDATE_BY_ID_FAIL,
  USER_ADMIN_UPDATE_BY_ID_RESET,
} from '../../constants/userConstants.js';

let baseURL = 'http://localhost:5000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://shoop.herokuapp.com/';
}

// ************** user login slice **************
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

// ************** user login action **************
export const fetchUserLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${baseURL}/api/users/login`,
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
        `${baseURL}/api/users`,
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
    [USER_DETAIL_RESET]: (state) => {
      state.user = {};
    },
  },
});

export const {
  userDetailRequest,
  userDetailSuccess,
  userDetailFail,
  userDetailReset,
} = userDetailSlice.actions;

// ************** user detail action **************
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

    const { data } = await axios.get(`${baseURL}/api/users/${id}`, config);

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
      state.success = true;
      state.user = action.payload;
    },
    [USER_UPDATE_PROFILE_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [USER_UPDATE_PROFILE_RESET]: (state) => {
      state.user = {};
      state.success = false;
    },
  },
});

export const {
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
  userUpdateProfileReset,
} = userUpdateProfileSlice.actions;

// ************** user update profile action **************

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
      `${baseURL}/api/users/profile`,
      user,
      config
    );

    dispatch(userUpdateProfileSuccess(data));
  } catch (error) {
    dispatch(userUpdateProfileFail(error.response));
  }
};

// ************** user admin get all users slice **************
export const userAdminGetAllUsersSlice = createSlice({
  name: 'userAdminGetAllUsers',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    [USER_ADMIN_GET_ALL_USERS_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_ADMIN_GET_ALL_USERS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [USER_ADMIN_GET_ALL_USERS_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [USER_ADMIN_GET_ALL_USERS_RESET]: (state) => {
      state.users = [];
    },
  },
});

export const {
  userAdminGetAllUsersRequest,
  userAdminGetAllUsersSuccess,
  userAdminGetAllUsersFail,
  userAdminGetAllUsersReset,
} = userAdminGetAllUsersSlice.actions;

// ************** user admin get all users action **************
export const fetchAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userAdminGetAllUsersRequest());

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${baseURL}/api/users`, config);
    dispatch(userAdminGetAllUsersSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(userAdminGetAllUsersFail(error.response));
  }
};

// ************** user admin delete by Id slice **************
export const userAdminDeleteByIdSlice = createSlice({
  name: 'userAdminDeleteById',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    [USER_ADMIN_DELETE_BY_ID_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_ADMIN_DELETE_BY_ID_SUCCESS]: (state) => {
      state.loading = false;
    },
    [USER_ADMIN_DELETE_BY_ID_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userAdminDeleteByIdRequest,
  userAdminDeleteByIdSuccess,
  userAdminDeleteByIdFail,
} = userAdminDeleteByIdSlice.actions;

// ************** user admin delete by Id action **************
export const deleteUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch(userAdminDeleteByIdRequest());

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${baseURL}/api/users/${id}`, config);
    dispatch(userAdminDeleteByIdSuccess());
  } catch (error) {
    dispatch(userAdminDeleteByIdFail(error.response));
  }
};

// ************** user admin update by Id slice **************
export const userAdminUpdateByIdSlice = createSlice({
  name: 'userAdminUpdateById',
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    [USER_ADMIN_UPDATE_BY_ID_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_ADMIN_UPDATE_BY_ID_SUCCESS]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [USER_ADMIN_UPDATE_BY_ID_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [USER_ADMIN_UPDATE_BY_ID_RESET]: (state) => {
      state.user = {};
    },
  },
});

export const {
  userAdminUpdateByIdRequest,
  userAdminUpdateByIdSuccess,
  userAdminUpdateByIdFail,
  userAdminUpdateByIdReset,
} = userAdminUpdateByIdSlice.actions;

// ************** user admin update by Id action **************
export const updateUserById = (user) => async (dispatch, getState) => {
  try {
    dispatch(userAdminUpdateByIdRequest());

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${baseURL}/api/users/${user._id}`,
      user,
      config
    );

    dispatch(userAdminUpdateByIdSuccess(data));
  } catch (error) {
    dispatch(userAdminUpdateByIdFail(error.response));
  }
};
