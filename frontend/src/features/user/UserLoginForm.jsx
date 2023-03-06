import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLogin, userLoginErrorReset } from './userSlice.js';
import Message from '../../components/Message.jsx';
import Loader from '../../components/Loader.jsx';
import FormContainer from '../../components/FormContainer.jsx';
import { Form, Button, Row, Col } from 'react-bootstrap';

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //when refreshing, delete error
    dispatch(userLoginErrorReset());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo.token) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitHandler');
    dispatch(fetchUserLogin(email, password));
  };

  const adminLogin = () => {
    console.log('admin login');
    setEmail('admin@admin.com');
    setPassword('adminpassword');
  };

  const demoLogin = () => {
    console.log('demo login');
    setEmail('demo@demo.com');
    setPassword('demopassword');
  };

  return (
    <FormContainer>
      <h1>Log In</h1>
      {error && <Message variant="danger">{error.data.message}</Message>}
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
        <Button type="submit" variant="primary">
          Log In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
        <Col>
          <Button type="button" onClick={demoLogin} variant="danger">
            Demo Login
          </Button>
          <Button type="button" onClick={adminLogin} variant="danger">
            Admin Login
          </Button>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default UserLoginForm;
