import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { Row, Col, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../features/product/productSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import PriceSlider from '../components/PriceSlider.jsx';

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //should probably create a separate component for the filters with similar patterns. It's getting messy...
  const [priceFilter, setPriceFilter] = useState('0-5000');
  const [brandFilter, setBrandFilter] = useState('');
  const [rearSuspensionTypeFilter, setRearSuspensionTypeFilter] = useState('');
  const [forkTravelFilter, setForkTravelFilter] = useState('');

  const products = useSelector((state) => state.productList.productList);
  const { loading, error } = products;

  let filteredProducts = products.filter((product) => {
    if (!priceFilter) {
      return true;
    }
    const [minPrice, maxPrice] = priceFilter.split('-');
    const productPrice = product.price;
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  if (brandFilter) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.brand &&
        product.brand.toLowerCase().includes(brandFilter.toLowerCase())
    );
  }

  if (rearSuspensionTypeFilter) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.rearSuspensionType &&
        product.rearSuspensionType
          .toLowerCase()
          .includes(rearSuspensionTypeFilter.toLowerCase())
    );
  }

  if (forkTravelFilter) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.forkTravel &&
        product.forkTravel
          .toLowerCase()
          .includes(forkTravelFilter.toLowerCase())
    );
  }

  const rearSuspensionTypes = Array.from(
    new Set(products.map((product) => product.rearSuspensionType))
  ).filter(Boolean); //takes out the ones that doesn't have a value for rearSuspensionType

  const brands = Array.from(
    new Set(products.map((product) => product.brand))
  ).filter(Boolean);

  const forkTravels = Array.from(
    new Set(products.map((product) => product.forkTravel))
  ).filter(Boolean);

  const handleResetFilters = () => {
    setPriceFilter('0-5000');
    setBrandFilter('');
    setRearSuspensionTypeFilter('');
    setForkTravelFilter('');
  };

  return (
    <Row>
      <Col md={2}>
        <Form>
          <PriceSlider
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
          />
          <Form.Group className="my-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              as="select"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option key="all" value="">
                All
              </option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="rearSuspensionType">
            <Form.Label>Rear Suspension Type</Form.Label>
            <Form.Control
              as="select"
              value={rearSuspensionTypeFilter}
              onChange={(e) => setRearSuspensionTypeFilter(e.target.value)}
            >
              <option key="all" value="">
                All
              </option>
              {rearSuspensionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="my-3" controlId="forkTravel">
            <Form.Label>Fork Travel (mm)</Form.Label>
            <Form.Control
              as="select"
              value={forkTravelFilter}
              onChange={(e) => setForkTravelFilter(e.target.value)}
            >
              <option key="all" value="">
                All
              </option>
              {forkTravels.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="light" onClick={handleResetFilters}>
            Reset Filters
          </Button>
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
            {filteredProducts.map((product) => (
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
