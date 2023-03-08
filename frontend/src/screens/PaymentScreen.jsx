import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
const PaymentScreen = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <>
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
          ></Form.Check>
          <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
          ></Form.Check>
        </Form.Group>
        <Button onClick={submitHandler} type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentScreen;
