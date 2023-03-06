import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ClearCartButton from '../features/cart/ClearCartButton';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <ClearCartButton />
          </Col>
          <Col className="text-center py-3">Shooop &copy; 2023</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
