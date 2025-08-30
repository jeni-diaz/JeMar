import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Background from "../background/Background";

import './HomePage.css';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <Background image="/images/ImageHome.svg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">

        <Container className="tracking-container custom-box w-100">
          <Row className="justify-content-center text-center">
            <Col xs={6} md={4} className="tracking-text">
              <h2 className="m-0">
                Hace el seguimiento
                <br />
                de tus envíos
              </h2>
            </Col>

            <Col xs={6} md={3} className="shipping-select text-center">
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
              <Button
                className={`Button-acction ${activeButton === 'quote' ? 'active' : ''}`}
                onClick={() => setActiveButton('quote')}
              >Cotizar</Button>
            </Col>
            <Col xs="auto">
              <Button
                className={`Button-acction ${activeButton === 'ship' ? 'active' : ''}`}
                onClick={() => setActiveButton('ship')}
              >Realizar</Button>
            </Col>
            <Col xs="auto">
              <Button
                className={`Button-acction ${activeButton === 'track' ? 'active' : ''}`}
                onClick={() => setActiveButton('track')}
              >Rastrear</Button>
            </Col>
          </Row>
        </Container>

      </Container>
    </Background>
  );
};

export default HomePage;
