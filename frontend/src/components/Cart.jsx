import React from 'react';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartButton from '../features/cart/CartButton';

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const productRow = (product) => {
    return (
      <ListGroup.Item key={product._id}>
        <Row>
          <Col md={2}>
            <Image src={product.image} alt={product.name} fluid rounded />
          </Col>
          <Col md={3}>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </Col>
          <Col md={4} className="text-center">
            <CartButton product={product} />
          </Col>
          <Col md={2}>${product.price}</Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <div>
      <h1>Cart</h1>
      <ListGroup variant="flush">
        <ListGroup.Item>
          {cartProducts.map((product) => productRow(product))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Cart;
