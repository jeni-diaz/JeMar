import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

import '../style/Styles.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container fluid className="Header d-flex justify-content-center position-fixed top-0 start-50 translate-middle-x">
          <img src="./public/images/Icon.svg" alt="Icono" height={40} className="me-2" />
          <span className="brand-text fs-2">Envíos JeMar</span>

          <Nav className="ms-auto">
            <div className="mt-2 text-center fs-4">
              <Link to="/login" className="text-decoration-none custom-link mx-2">Iniciar Sesión</Link>
              <Link to="/" className="text-decoration-none custom-link mx-2">Inicio</Link>
              <Link to="/contact" className="text-decoration-none custom-link mx-2">Contacto</Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;