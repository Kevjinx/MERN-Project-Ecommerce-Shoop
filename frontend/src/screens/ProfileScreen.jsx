import React, { useEffect } from 'react';
import { fetchUserDetails } from '../features/user/userSlice.js';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails('6403efe3fe58db093f2e1262'));
  }, []);

  return <div>ProfileScreen</div>;
};

export default ProfileScreen;
