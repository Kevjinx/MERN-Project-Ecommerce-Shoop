import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [message, setMessage] = useState('');

  //so user don't have to refill shipping info. #CustomerExperienceLevel9000 :)
  useEffect(() => {
    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setCountry(shippingAddress.country);
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
    if (address && city && postalCode && country) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate('/payment');
    } else {
      setMessage('Please fill out all fields');
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </Form.Group>
        {message && <Message variant="danger">{message}</Message>}
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
