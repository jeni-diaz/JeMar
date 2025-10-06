import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Background from "../background/Background";
import CardOne from "./cards/CardOne";
import CardTwo from './cards/CardTwo';
import CardThree from './cards/CardThree';
import CardFour from './cards/CardFour';
import CardFive from './cards/CardFive';
import CardSix from './cards/CardSix';

import '../style/Styles.css';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

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
      <Background image="/images/ImageHome.png">


        <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">

          <Container className="button-bar mt-auto mb-3">
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'quote' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('quote')}
                >Cotizar</Button>
              </Col>
              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'track' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('track')}
                >Rastrear</Button>
              </Col>
              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'modify' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('')}
                >Modificar</Button>
              </Col>

              <Col xs="auto">
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${activeButton === 'consult' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('')}
                >Consultar</Button>
              </Col>
            </Row>
          </Container>
        </Container>
      </Background>

      <div className="blackLine"></div>

      <Background image="/images/ImageHome1.png">
        <div className='color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column'>

          <h2 className='title-card mt-5' style={{ fontSize: '2.5rem' }}>Recomendaciones para embalar tu paquete</h2>
          <Row>
            <Col>
              <CardOne />
            </Col>
            <Col>
              <CardTwo />
            </Col>
            <Col>
              <CardThree />
            </Col>
          </Row>

          <Row>
            <Col>
              <CardFour />
            </Col>
            <Col>
              <CardFive />
            </Col>
            <Col>
              <CardSix />
            </Col>
          </Row>

        </div>
      </Background>
    </>
  );
};

export default HomePage;