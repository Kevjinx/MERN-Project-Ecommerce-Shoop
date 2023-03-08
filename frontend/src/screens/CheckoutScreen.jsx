import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Image,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import {
  removeDiscountCode,
  addDiscountCode,
} from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartProducts, discountCode } = useSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(
    cartProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0)
  );

  const [message, setMessage] = useState('');
  const [dangerMessage, setDangerMessage] = useState('');

  const [discountCodeInput, setDiscountCodeInput] = useState('');

  //TODO: add backend verification for discount code
  const discounts = {
    '5plus5equals11': 11,
    freeplus20: 120,
  };

  const addDiscountHandler = () => {
    console.log('Discount Code: ', discountCodeInput);

    if (discounts[discountCodeInput]) {
      dispatch(addDiscountCode(discountCodeInput));
      setMessage(
        `Discount applied: ${discountCodeInput} for ${discounts[discountCodeInput]}% off!`
      );
      setDangerMessage('');
      setSubTotal(
        (subTotal - subTotal * (discounts[discountCodeInput] / 100)).toFixed(2)
      );
    } else {
      setMessage('');
      setDangerMessage(`Discount code ${discountCodeInput} is not valid!`);
    }
  };

  const removeDiscountHandler = () => {
    dispatch(removeDiscountCode());
    setMessage('');
    setSubTotal(
      cartProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0)
    );
  };

  const discountToggle = () => {
    if (discountCode && message) {
      //'message' = workaround for discount code not being removed from state
      return <Button onClick={removeDiscountHandler}>Remove Discount</Button>;
    } else {
      return <Button onClick={addDiscountHandler}>Add Discount</Button>;
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Order Summary</h1>
        <ListGroup>
          {cartProducts.map((product) => (
            <ListGroup.Item key={product._id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={4}>
                  <p>{product.name}</p>
                </Col>
                <Col md={2}>
                  <p>{product.quantity}</p>
                </Col>
                <Col md={2}>
                  <p>${product.price}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key="subtotal">
            <Row className="ps-3 pe-3 pt-1">
              {dangerMessage && (
                <Message variant="danger">{dangerMessage}</Message>
              )}
              {message && <Message variant="success">{message}</Message>}
            </Row>
            {/* sub total */}
            <Row>
              <Col md={2} />
              <Col md={6}>
                <p>Subtotal</p>
              </Col>
              <Col md={2}>
                <p>${subTotal}</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <Row className="">
          <InputGroup>
            <FormControl
              onChange={(e) => setDiscountCodeInput(e.target.value)}
              type="text"
              placeholder="Discount Code"
            />
            {discountToggle()}
          </InputGroup>
        </Row>
        <Row>
          <Col md={4} className="pt-2">
            <Link to="/payment">
              <Button>Proceed to Payment</Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CheckoutScreen;
