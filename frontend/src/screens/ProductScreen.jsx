import React, { useEffect } from 'react';
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import CartButton from '../features/cart/CartButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/product/productSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message.jsx';

const ProductScreen = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const product = useSelector((state) => state.productDetail.productDetail);
  const { loading, error } = product;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.imageUrl} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>Brand: {product.brand}</ListGroup.Item>
              <ListGroup.Item>Category: {product.category}</ListGroup.Item>
              <ListGroup.Item>Wheel Size: {product.wheelSize}</ListGroup.Item>
              <ListGroup.Item>
                Drivetrain Type: {product.drivetrainType}
              </ListGroup.Item>
              <ListGroup.Item>Bike Model: {product.bikeModel}</ListGroup.Item>
              <ListGroup.Item>
                Rear Suspension Type: {product.rearSuspensionType}
              </ListGroup.Item>
              <ListGroup.Item>Fork Travel: {product.forkTravel}</ListGroup.Item>
              <ListGroup.Item>
                Count in Stock: {product.countInStock}
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={parseInt(product.rating)}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <p>Price: ${product.price}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  <CartButton product={product} />
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  <Link to={`/admin/products/${product._id}/edit`}>
                    <Button className="btn btn-primary">Edit Product</Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
