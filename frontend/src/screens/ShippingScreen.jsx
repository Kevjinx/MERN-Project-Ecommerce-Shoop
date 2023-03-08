import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Image,
  InputGroup,
  FormControl,
  Dropdown,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { saveShippingAddress } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const [subTotal, setSubTotal] = useState(
    cartProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0)
  );

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [message, setMessage] = useState('');
  const [dangerMessage, setDangerMessage] = useState('');

  //TODO: update discount stuff to use redux state so it persists on refresh
  //TODO: add backend verification for discount code
  const addDiscountHandler = () => {
    if (discountApplied) {
      return setDangerMessage(`You've already applied a discount code!`);
    }
    console.log('Discount Code: ', discountCode);
    discountCode === '5plus5equals11' && discountSubTotal(11);
    discountCode === 'freeplus20' && discountSubTotal(120);
  };

  const discountSubTotal = (discount) => {
    if (discount > 100) {
      setDangerMessage(`STOP HACKING! You're not getting a free product!`);
    } else {
      setDangerMessage('');
      setMessage(`Discount applied: ${discountCode} for ${discount}% off!`);
    }
    setSubTotal(subTotal - subTotal * (discount / 100));
    setDiscountApplied(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
  };

  return (
    <Row>
      <Col md={7}>
        <FormContainer>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col md={5}>
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
              onChange={(e) => setDiscountCode(e.target.value)}
              type="text"
              placeholder="Discount Code"
            />
            <Button onClick={addDiscountHandler}>Add Discount</Button>
          </InputGroup>
        </Row>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
