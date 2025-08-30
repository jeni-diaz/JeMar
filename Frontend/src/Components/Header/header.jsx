import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './header.css';

const Header = () => {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container fluid className="Header d-flex justify-content-center position-fixed top-0 start-50 translate-middle-x">
          <img src="./public/images/Icono.svg" alt="Icono" height={40} className="me-2"/>
          <span className="brand-text">Envíos JeMar</span>

        <Nav className="ms-auto">
          <Button className="Button">Contacto</Button>
          <Button className="Button">Iniciar Sesión</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;