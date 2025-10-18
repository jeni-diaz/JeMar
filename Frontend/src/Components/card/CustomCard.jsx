import { Container, Row, Col, Button } from "react-bootstrap";

const CustomCard = ({
  title,
  children,
  buttonText,
  buttonAction,
  buttonType = "button",
}) => {
  return (
    <Container className="d-flex align-items-center min-vh-100">
      <div className="small-container d-flex flex-column justify-content-center">

        <Row className="mt-2">
          <Col>
            <h2 className="titulo text-center fw-bold">{title}</h2>
          </Col>
        </Row>

        <Row className="flex-grow p-4 ocultar-scroll">
          <Col>{children}</Col>
        </Row>

        {buttonText && (
          <Row>
            <Col className="d-flex flex-column align-items-center mt-3 mb-4">
              <Button
                className="custom-button w-50"
                type={buttonType}
                onClick={buttonAction}
              >
                {buttonText}
              </Button>
            </Col>
          </Row>
        )}

      </div>
    </Container>
  );
};

export default CustomCard;

