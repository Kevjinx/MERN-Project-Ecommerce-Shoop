import React from 'react';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartButton from '../features/cart/CartButton';
import ClearCartButton from '../features/cart/ClearCartButton';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cartProducts);
  const productsInCart = cart.filter((product) => product.quantity > 0);

  const productRow = (product) => {
    return (
      <ListGroup.Item key={product._id}>
        <Row>
          <Col md={2}>
            <Image src={product.imageUrl} alt={product.name} fluid rounded />
          </Col>
          <Col md={2}>
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

  const numProductsInCart = productsInCart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const grossTotal = productsInCart
    .reduce((acc, product) => acc + product.quantity * product.price, 0)
    .toFixed(2);

  const handleCheckout = () => {
    console.log('Checkout');
  };

  return (
    <div>
      <h1>Cart</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {productsInCart.map((product) => productRow(product))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Row>
            <h3>Subtotal ({numProductsInCart}) items</h3>
            <h4>${grossTotal}</h4>
          </Row>
          <Row>
            <Link to="/checkout">
              <Button
                type="button"
                className="btn-block"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </Row>
        </Col>
      </Row>
      <ClearCartButton />
    </div>
  );
};

export default CartScreen;
