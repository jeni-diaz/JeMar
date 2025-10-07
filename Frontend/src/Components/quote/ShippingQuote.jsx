import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import "../style/Styles.css";

const ShippingQuote = () => {
  const [showSecondCard, setShowSecondCard] = useState(false);

  const handleQuoteClick = () => {
    setShowSecondCard(true);
  };

  return (
    <Background image="/images/ImageQuote.png">
      <div className="cards-container">
        <Row className="justify-content-center w-100">
          <Col md={6}>
            <CustomCard
              title="COTIZAR ENVÍO"
              buttonText="Cotizar"
              buttonAction={handleQuoteClick}
            >
              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Tipo de envío:</Form.Label>
                <Form.Select className="custom-input">
                  <option value="">-</option>
                  <option value="standard">Envío estándar</option>
                  <option value="express">Envío exprés</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Origen:</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="text"
                  placeholder="Ej: Rosario"
                />
              </Form.Group>

              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Destino:</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="text"
                  placeholder="Ej: Buenos Aires"
                />
              </Form.Group>
            </CustomCard>
          </Col>

          <Col md={4}>
            {showSecondCard && (
              <CustomCard
                title="COTIZACIÓN"
                buttonText="Aceptar"
                onClick={() => setShowSecondCard(false)}
              >

                {/*Contedido*/}
              </CustomCard>
            )}
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default ShippingQuote;
