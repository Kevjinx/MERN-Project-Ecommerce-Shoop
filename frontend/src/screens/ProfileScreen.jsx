import React, { useEffect } from 'react';
import { fetchUserDetails } from '../features/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails('profile'));
  }, [dispatch]);

  return (
    <>
      <div>ProfileScreen</div>
    </>
  );
};

export default ProfileScreen;
