import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  orderDeliverReset,
  getOrderDetail,
  deliverOrder,
} from '../features/order/orderSlice.js';

const OrderDetailScreen = () => {
  const { orderId } = useParams();
  console.log(orderId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDelivered, setIsDelivered] = useState(false);
  const [isPaid, setIsPaid] = useState(false); // Add state for isPaid

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;
  console.log(order); // correct

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let updatedOrder;

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );

    console.log(itemsPrice);

    // Create a new order object with the added itemsPrice property
    updatedOrder = { ...order, itemsPrice };
  }

  console.log('updatedOrder', updatedOrder);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    // Only reset and fetch order details if successDeliver is true or order._id is not orderId
    if (successDeliver || (order && order._id !== orderId)) {
      dispatch(orderDeliverReset());
      dispatch(getOrderDetail(orderId));
    }
  }, [dispatch, orderId, successDeliver, userInfo, navigate]);

  // Fetch order details on component mount
  useEffect(() => {
    dispatch(getOrderDetail(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order && order.isPaid) {
      setIsPaid(true);
    }
  }, [order]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    setIsDelivered(true);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    order && (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.firstName}{' '}
                  {order.user.lastName}
                </p>
                <p>
                  <strong>Email: </strong>{' '}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered || isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={5}>
                            {item.quantity} x ${item.price} = $
                            {item.quantity * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${updatedOrder.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${updatedOrder.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${updatedOrder.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${updatedOrder.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};

export default OrderDetailScreen;
