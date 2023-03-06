import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser, fetchUserLogin } from '../features/user/userSlice.js';
import FormContainer from '../components/FormContainer.jsx';
import { Form, Button } from 'react-bootstrap';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitHandler');
    dispatch(registerUser(email, password, firstName, lastName));
    dispatch(fetchUserLogin(email, password));
    navigate('/');
  };

  const demoRegister = () => {
    console.log('demo register');
    dispatch(
      registerUser('demo@email.com', 'password', 'NewDemoUser', 'DemoLastName')
    );
    dispatch(fetchUserLogin('demo@email.com', 'password'));
    navigate('/');
  };
  return (
    <FormContainer>
      <h1>Register</h1>

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
          Register
        </Button>
      </Form>

      <Button type="button" onClick={demoRegister} variant="danger">
        Demo Register User
      </Button>
    </FormContainer>
  );
};

export default RegisterScreen;
