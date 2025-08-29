import { Container, Row, Col, Button } from 'react-bootstrap';
import './home-page.css';

const HomePage = () => {
  return (
    <div className="fondo">
      <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">

        <Container className="tracking-container custom-box w-100">
          <Row className="align-items-center justify-content-between">
            <Col className="tracking-text text-center mb-3 mb-md-0">
              <h2 className="m-0">
                Hace el seguimiento
                <br />
                de tus envíos
              </h2>
            </Col>

            <Col className="shipping-select">
              <label className="form-label">Selecciona el tipo de envío</label>
              <select className="form-select">
                <option> - </option>
                <option>Estándar</option>
                <option>Express</option>
              </select>
              <i className="bi bi-caret-down-square-fill custom-icon"></i>
            </Col>
          </Row>
        </Container>

        <Container className="button-bar position-fixed start-50 translate-middle-x" style={{ bottom: 30 }}>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button className="Button-acction">Cotizar</Button>
            </Col>
            <Col xs="auto">
              <Button className="Button-acction">Realizar</Button>
            </Col>
            <Col xs="auto">
              <Button className="Button-acction">Rastrear</Button>
            </Col>
          </Row>
        </Container>

      </Container>
    </div>
  );
};

export default HomePage;
