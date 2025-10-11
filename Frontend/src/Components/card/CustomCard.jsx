import { Container, Row, Col, Button } from "react-bootstrap";

import '../style/Styles.css';

const CustomCard = ({ title, children }) => {
  return (
    <Container className="d-flex align-items-center min-vh-100">
      <div className="small-container d-flex flex-column justify-content-center">

        <Row className="mt-2">
          <Col>
            <h2 className="titulo text-center mb-2 mt-3 fw-bold p-2">{title}</h2>
          </Col>
        </Row>

        <Row className="flex-grow p-4 ocultar-scroll">
          <Col>
            {children}
          </Col>
        </Row>

      </div>
    </Container>
  );
};

export default CustomCard;