import { Container, Row, Col, Button } from "react-bootstrap";

const CustomCard = ({ title, children, buttonText, buttonAction }) => {
  return (
    <Container className="d-flex align-items-center min-vh-100">
      <div className="small-container d-flex flex-column justify-content-center">
        
        <Row mt-2>
          <Col>
            <h2 className="titulo text-center mb-2 mt-3 fw-bold">{title}</h2>
          </Col>
        </Row>

        <Row className="flex-grow-1 overflow-auto p-4">
          <Col>
            {children}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-3 mb-4">
            {buttonText && (
              <Button
                className="custom-button mx-auto w-50 d-flex justify-content-center"
                onClick={buttonAction}
              >
                {buttonText}
              </Button>
            )}
          </Col>
        </Row>

      </div>
    </Container>
  );
};

export default CustomCard;

