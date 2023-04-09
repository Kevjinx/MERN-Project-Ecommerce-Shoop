import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { Row, Col, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../features/product/productSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import PriceSlider from '../components/PriceSlider.jsx';

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [priceFilter, setPriceFilter] = useState('');

  const products = useSelector((state) => state.productList.productList);
  const { loading, error } = products;
  return (
    <Row>
      <Col md={2}>
        <Form>
          <PriceSlider
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
          />
        </Form>
      </Col>
      <Col md={10}>
        <h1>Latest Products</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default HomeScreen;
