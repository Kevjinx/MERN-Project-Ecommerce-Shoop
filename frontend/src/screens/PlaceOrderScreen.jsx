import React from 'react';
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  Card,
  Container,
  Button,
  Table,
} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const order = {
    userName: 'Chris',
    orderNumber: 1234,
    date: 'March 9th, 2023',
    totalAmount: 50.0,
    items: [
      {
        id: 1,
        quantity: 1,
        name: 'Item 1',
        price: 20.0,
        imageSrc: 'https://i.imgur.com/u11K1qd.jpg',
      },
      {
        id: 2,
        quantity: 1,
        name: 'Item 2',
        price: 15.0,
        imageSrc: 'https://i.imgur.com/SmBOua9.jpg',
      },
      {
        id: 3,
        quantity: 1,
        name: 'Item 3',
        price: 15.0,
        imageSrc: 'https://i.imgur.com/SmBOua9.jpg',
      },
    ],
    address: {
      address: '6007 Applegate Lane',
      city: 'Louisville',
      coordinates: {
        lat: 38.1343013,
        lng: -85.6498512,
      },
      postalCode: '40219',
      state: 'KY',
    },
    paymentMethod: 'Paypal',
    tax: '5.00',
    shippingFee: '10.00',
    discount: '15.00',
    subtotal: '50.00',
    date: 'March 9th, 2023',
  };

  const items = order.items.map((item) => {
    return (
      <tr>
        <td width="20%">
          <Image src={item.imageSrc} width="90" />
        </td>

        <td width="60%">
          <span className="font-weight-bold">{item.name}</span>
          <div className="product-qty">
            <span className="d-block">Quantity:{item.quantity}</span>
          </div>
        </td>
        <td width="20%">
          <div className="text-right">
            <span className="font-weight-bold">${item.price}</span>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Container className="mt-5 mb-5">
      <CheckoutSteps step1 step2 step3 step4 step5 />
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body className="invoice p-5">
              <h5>Your order Confirmed!</h5>

              <span className="font-weight-bold d-block mt-4">
                Hello, {order.userName}
              </span>
              <span>
                You order has been confirmed and will be shipped in next two
                days!
              </span>

              <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <div className="py-2">
                          <span className="d-block text-muted">Order Date</span>
                          <span>12 Jan,2018</span>
                        </div>
                      </td>

                      <td>
                        <div className="py-2">
                          <span className="d-block text-muted">Order No</span>
                          <span>{order.orderNumber}</span>
                        </div>
                      </td>

                      <td>
                        <div className="py-2">
                          <span className="d-block text-muted">Payment</span>
                          <span>
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                              width="80%"
                            />
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="py-2">
                          <span className="d-block text-muted">
                            Shiping Address
                          </span>
                          <span>
                            {order.address.address}, {order.address.city}{' '}
                            {order.address.state}, {order.address.postalCode}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="product border-bottom table-responsive">
                <Table borderless>
                  <tbody>{items}</tbody>
                </Table>
              </div>
              <Row className="justify-content-end">
                <Col md={5}>
                  <Table borderless className="totals">
                    <tbody>
                      <tr>
                        <td>
                          <div className="text-left">
                            <span className="text-muted">Subtotal</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            <span>$168.50</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="text-left">
                            <span className="text-muted">Shipping Fee</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            <span>${order.shippingFee}</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="text-left">
                            <span className="text-muted">Tax Fee</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            <span>${order.tax}</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="text-left">
                            <span className="text-muted">Discount</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            <span className="text-success">
                              ${order.discount}
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr className="border-top border-bottom">
                        <td>
                          <div className="text-left">
                            <span className="font-weight-bold">Subtotal</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            <span className="font-weight-bold">
                              ${order.subtotal}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <p>
                We will be sending shipping confirmation email when the item
                shipped successfully!
              </p>
              <p className="font-weight-bold mb-0">
                Thanks for shopping with us!
              </p>
              <span>Shoop Team</span>
            </Card.Body>{' '}
            <Card.Footer className="d-flex justify-content-between p-3">
              <span>
                Need Help? visit our{' '}
                <a href="#sorry-cant-help-you-yet"> help center</a>
              </span>
              <span>{order.data}</span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
