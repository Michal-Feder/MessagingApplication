import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // import the useAuth hook

const NavbarComponent = () => {
    const navigate = useNavigate();
    const { isAuthenticated, username, logout } = useAuth();
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  
    return (
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/chat">Messaging Application</Navbar.Brand>
          <Nav className="ml-auto d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="text-white">
                  <strong>Hello, {username}</strong>
                </span>
                <Button variant="outline-light" onClick={handleLogout} className="m-1">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" onClick={() => navigate('/login')} className="m-1">
                  Login
                </Button>
                <Button variant="outline-light" onClick={() => navigate('/register')} className="m-1">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  };
  

export default NavbarComponent;
