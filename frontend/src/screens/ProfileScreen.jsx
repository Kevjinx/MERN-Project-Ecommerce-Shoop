import React, { useEffect, useState } from 'react';
import {
  fetchUserDetails,
  updateUserProfile,
  userUpdateProfileReset,
} from '../features/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState(null);
  // const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateSuccess = userUpdateProfile.success;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
    } else {
      const updatedUser = {
        _id: user._id,
        email,
        password,
        firstName,
        lastName,
      };
      dispatch(updateUserProfile(updatedUser));
      setMessage(null);
    }
  };

  useEffect(() => {
    if (!userLogin.userInfo.token) {
      navigate('/login');
    } else {
      if (!user._id) {
        dispatch(userUpdateProfileReset());
        dispatch(fetchUserDetails('profile'));
      } else {
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      }
    }
  }, [dispatch, user, navigate, userLogin]);

  return (
    <>
      <Row>
        <Col md={4}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {updateSuccess && (
            <Message variant="success">Profile Updated</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
        {/* <Col md={8}>
          <h2>My Orders</h2>
        </Col> */}
      </Row>
    </>
  );
};

export default ProfileScreen;
