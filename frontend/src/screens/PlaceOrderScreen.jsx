import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Image, Card, Container, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder, orderCreateReset } from '../features/order/orderSlice.js';
import { userDetailReset } from '../features/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartProducts, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate || {});
  const { success, error, order } = orderCreate;

  const itemsPrice = cartProducts.reduce((acc, item) => acc + item.price, 0);
  const taxPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * 0.05,
    0
  );
  const shippingPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * 0.1,
    0
  );
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success && order) {
      dispatch(orderCreateReset());
      dispatch(userDetailReset());
      // navigate(`/order/${updatedOrder._id}`);
    }
  }, [success]);

  const updatedOrder = {
    orderItems: cartProducts,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    user: userInfo._id,
  };
  const placeOrderHandler = () => {
    console.log(updatedOrder);

    dispatch(createOrder(updatedOrder));
  };

  const itemRow = (cartProducts) => {
    return cartProducts.map((product, index) => {
      return (
        <div key={index}>
          <Row className="p-2">
            <Col md={3}>
              <Image src={product.imageUrl} width="90" />
            </Col>
            <Col md={6}>
              <span className="font-weight-bold">{product.name}</span>
              <span className="d-block">Quantity:{product.quantity}</span>
            </Col>
            <Col md={3}>${product.price}</Col>
          </Row>
          <hr />
        </div>
      );
    });
  };

  const labelCostRow = (label, cost) => {
    return (
      <Row className="p-1">
        <Col md={8}>{label}</Col>
        <Col md={4}>${cost}</Col>
      </Row>
    );
  };

  return (
    <Container fluid>
      <CheckoutSteps step1 step2 step3 step4 step5 />
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body className="invoice p-5">
              {success && (
                <div className="alert alert-success" role="alert">
                  Order Placed Successfully!
                </div>
              )}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <Row>
                <Col md={3}>
                  <span className="d-block text-muted">Order Date</span>
                  <span>12 Jan,2018</span>
                </Col>
                <Col md={3}>
                  <span className="d-block text-muted">Order No</span>
                  <span>{updatedOrder.orderNumber}</span>
                </Col>
                <Col md={3}>
                  <span className="d-block text-muted">Payment</span>
                  <span>{paymentMethod}</span>
                </Col>
                <Col md={3}>
                  <span className="d-block text-muted">Shipping Address</span>
                  <span>
                    {shippingAddress.address}, {shippingAddress.city}{' '}
                    {shippingAddress.state}, {shippingAddress.postalCode}
                  </span>
                </Col>
              </Row>
              <hr />
              {itemRow(cartProducts)}
              <Row className="justify-content-end p-3">
                <Col md={8}>
                  {labelCostRow('Subtotal', updatedOrder.itemsPrice)}
                  {labelCostRow('Shipping Fee', updatedOrder.shippingPrice)}
                  {labelCostRow('Tax Fee', updatedOrder.taxPrice)}
                  {labelCostRow('Discount', updatedOrder.discount)}
                  <hr />
                  {labelCostRow('Total', updatedOrder.totalPrice)}
                  <hr />
                  <Button onClick={placeOrderHandler}>Place Order</Button>
                </Col>
              </Row>
              <hr />

              <p>
                We will be sending shipping confirmation email when the item
                shipped successfully!
              </p>
              <p>Thanks for shopping with us!</p>
              <span>Shoop Team</span>
            </Card.Body>{' '}
            <Card.Footer>
              <span>
                Need Help? visit our{' '}
                <a href="#sorry-cant-help-you-yet"> help center</a>
              </span>
              <span>{updatedOrder.data}</span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
