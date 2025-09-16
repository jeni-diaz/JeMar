import { Container, Row, Col, Button } from "react-bootstrap";

import '../style/Styles.css';

const CustomCard = ({ title, children, buttonText, buttonAction }) => {
  return (
    <Container className="d-flex align-items-center min-vh-100">
      <div className="small-container d-flex flex-column justify-content-center">

        <Row mt-2>
          <Col>
            <h2 className="titulo text-center mb-2 mt-3 fw-bold p-2">{title}</h2> {/* Texto del título*/}
          </Col>
        </Row>

        <Row className="flex-grow-1 overflow-auto p-4">
          <Col>
            {children} {/* Muestra el contenido dinámico que se pasa dentro del componente */}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-3 mb-4">
            {/* Si existe buttonText, se muestra el botón */}
            {buttonText && (
              <Button className="custom-button mx-auto w-50 d-flex justify-content-center" onClick={buttonAction}> {/* Ejecuta la función cuando se hace clic */}
                {buttonText} {/* Texto del botón */}
              </Button>
            )}
          </Col>
        </Row>

      </div>
    </Container>
  );
};

export default CustomCard;