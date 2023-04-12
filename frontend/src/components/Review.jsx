import {
  createProductReview,
  productCreateReviewReset,
} from '../features/product/productSlice.js';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating.jsx';
import Message from './Message.jsx';
import Loader from './Loader.jsx';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Review = ({ productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productCreateReview;

  const product = useSelector((state) => state.productDetail.productDetail);
  const reviews = useSelector((state) => state.productDetail.reviews);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== productId) {
      dispatch(productCreateReviewReset());
    }
  }, [dispatch, successProductReview, product._id, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <h2>Reviews</h2>

      {reviews && reviews.length > 0 && <Message>No Reviews</Message>}
      <ListGroup variant="flush">
        {reviews.map((review) => (
          <ListGroup.Item key={review._id}>
            <strong>{review.name}</strong>
            <Rating value={review.rating} />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <h2>Write a Customer Review</h2>
          {successProductReview && (
            <Message variant="success">Review submitted successfully</Message>
          )}
          {loadingProductReview && <Loader />}
          {errorProductReview && (
            <Message variant="danger">{errorProductReview}</Message>
          )}
          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  row="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loadingProductReview}
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to write a review{' '}
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Review;
