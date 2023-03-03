import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';

const Cart = () => {
  return (
    <div>
      <h1>Cart</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shopping Cart</h2>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal (0) items</h2>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
