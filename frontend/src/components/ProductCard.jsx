import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import CartButton from '../features/cart/CartButton.jsx';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '15rem' }} className="mb-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.imageUrl} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            className="my-3"
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h4" className="my-3">
          ${product.price}
        </Card.Text>
        <CartButton product={product} />
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
