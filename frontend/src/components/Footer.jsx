import React from 'react';
import { Container, Row, Col, Button, DropDown } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Shooop &copy; 2023</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
