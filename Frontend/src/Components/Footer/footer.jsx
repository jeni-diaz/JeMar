import { Container } from 'react-bootstrap';

import './footer.css';

const Footer = () => {
  return (
    
      <Container fluid className="Footer d-flex justify-content-center position-fixed bottom-0 start-50 translate-middle-x">
        <span className="footer-text">© 2025 Envíos JeMar - Todos los derechos reservados</span>
      </Container>
   
  );
};

export default Footer;
