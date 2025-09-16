import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Background from "../background/Background";

import '../style/GeneralStyles.css';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);

    switch (button) {
      case 'quote':
        navigate('/quote');
        break;
      case 'track':
        navigate('/track');
        break;
      case 'modify':
        navigate('/modify');
      case 'colsult':
        navigate('/consult');
      default:
        break;
    }
  }

  return (
    <>
      <Background image="/images/ImageHome.jpg">

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
                <select className="border-0 form-select">
                  <option> - </option>
                  <option>Estándar</option>
                  <option>Express</option>
                </select>
              </Col>
            </Row>
          </Container>

          <Container className="button-bar position-fixed start-50 translate-middle-x" style={{ bottom: 30 }}>
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'quote' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('quote')}
                >
                  Cotizar
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'track' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('track')}
                >
                  Rastrear
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'modify' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('')}
                >
                  Modificar
                </Button>
              </Col>

              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'consult' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('')}
                >
                  Consultar
                </Button>
              </Col>

            </Row>
          </Container>

        </Container>
      </Background>
    </>
  );
};

export default HomePage;
