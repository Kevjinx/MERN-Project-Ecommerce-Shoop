import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from './userSlice.js';

const UserLogoutButton = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout());
    console.log('logout');
  };

  return (
    <Link to="/" onClick={logoutHandler}>
      Logout
    </Link>
  );
};

export default UserLogoutButton;
