import React from 'react';
import { Container } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-custom fixed-bottom">
      <Container fluid className="d-flex justify-content-center">
        <span className="footer-text">
          © 2025 Envíos JeMar - Todos los derechos reservados
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
