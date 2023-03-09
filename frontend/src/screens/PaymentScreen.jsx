import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../features/cart/cartSlice';
import FormContainer from '../components/FormContainer';

// TODO: update shippingAddress state to verify if user has filled out shipping info, and redirect if otherwise
const PaymentScreen = () => {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
    dispatch(savePaymentMethod(paymentMethod));
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 step4 />
        <h1>Payment Method</h1>
        <Form>
          <Form.Group controlId="paymentMethod">
            <Form.Label>Select Method</Form.Label>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Button onClick={submitHandler} type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
