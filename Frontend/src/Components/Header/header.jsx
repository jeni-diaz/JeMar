import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import "../style/Styles.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container
          fluid
          className="header d-flex justify-content-center position-fixed top-0 start-50 translate-middle-x"
        >
          <img
            src="./public/images/Icon.svg"
            alt="Icono"
            height={40}
            className="me-2"
          />
          <span className="brand-text fs-2">Envíos JeMar</span>

          <Nav className="ms-auto">
            <div className="mt-1 text-center">
              <Link to="/" className="text-decoration-none custom-link fs-3">
                Inicio
              </Link>
              <Link
                to="/contact"
                className="text-decoration-none custom-link mx-4 fs-3"
              >
                Contacto
              </Link>
              <Link
                to="/login"
                className="text-decoration-none custom-link me-2 fs-3"
              >
                <i className="bi bi-person-circle"></i>{" "}
                <span className="custom-link-text fs-3">Ingresar</span>
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
