import React from 'react';
import products from '../products';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { Routes, Route, useParams } from 'react-router-dom';

const ProductScreen = () => {
  const { productId } = useParams();

  return <></>;
};

export default ProductScreen;
