import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../features/user/userSlice.js';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log('logoutHandler');
    dispatch(userLogout());
    localStorage.removeItem('persist:root');
    window.location.reload();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          {/* wrapping to make element behave like a Link from react-router, avoiding screen reloading, while keeping bootstrap styling */}
          <LinkContainer to="/">
            <Navbar.Brand>Shoop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo.token ? (
                <NavDropdown title={userInfo.firstName}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-sign-in"></i>
                    Log In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
