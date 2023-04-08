import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import CartButton from '../features/cart/CartButton.jsx';

const BikeCard = ({ bike }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Link to={`/bike/${bike._id}`}>
        <Card.Img variant="top" src={bike.imageUrl} />
      </Link>
      <Card.Body>
        <Link to={`/bike/${bike._id}`}>
          <Card.Title as="div">
            <strong>{bike.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            className="my-3"
            value={bike.rating}
            text={`${bike.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h4" className="my-3">
          ${bike.price}
        </Card.Text>
        <CartButton bike={bike} />
      </Card.Body>
    </Card>
  );
};

export default BikeCard;
