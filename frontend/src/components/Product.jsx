import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
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

        <Card.Text as="div">{product.description}</Card.Text>

        <Card.Text as="h4" className="my-3">
          ${product.price}
        </Card.Text>

        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
