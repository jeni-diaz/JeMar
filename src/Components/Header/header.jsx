import React from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import './header.css';

const Header = () => {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center" href="#">
          <img src="./public/images/Icono.svg" alt="Icono" height={40} className="me-2"/>
          <span className="brand-text">Envíos JeMar</span>
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Button className="btn-custom contacto me-2">Contacto</Button>
          <Button className="btn-custom">Iniciar Sesión</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;