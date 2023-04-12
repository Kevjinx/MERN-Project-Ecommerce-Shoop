import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  updateUserById,
  fetchUserDetails,
  userAdminUpdateByIdReset,
} from '../features/user/userSlice.js';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditUserScreen = () => {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userAdminUpdateById = useSelector((state) => state.userAdminUpdateById);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userAdminUpdateById;

  useEffect(() => {
    if (successUpdate) {
      dispatch(userAdminUpdateByIdReset());
      navigate('/admin/users');
    } else {
      if (!user.firstName || user._id !== userId) {
        dispatch(fetchUserDetails(userId));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserById({ _id: userId, firstName, lastName, email, isAdmin })
    );
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="first Name"
              placeholder="Enter last name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
            <Form.Label>Last Name</Form.Label>

            <Form.Control
              type="last Name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AdminEditUserScreen;
