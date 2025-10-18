import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import ShippingQuote from "./quote/ShippingQuote";
import DeleteShipping from "./delete/DeleteShipping";
import ShippingTrack from "./track/ShippingTrack";

import "../style/Styles.css";

const Shipments = () => {
  const [activeComponent, setActiveComponent] = useState("quote");

  const buttons = [
    { key: "quote", label: "Cotizar" },
    { key: "delete", label: "Eliminar" },
    { key: "track", label: "Consultar" },
  ];

  return (
    <>
      <Background image="/images/ImageShipment.png">
        <BackArrow />
        <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">

          <div className="flex-grow-1 d-flex justify-content-center align-items-center w-100">
            <Row className="w-100 justify-content-center">
              <Col>
                {activeComponent === "quote" && <ShippingQuote />}
                {activeComponent === "delete" && <DeleteShipping />}
                {activeComponent === "track" && <ShippingTrack />}
              </Col>
            </Row>
          </div>

          <Row className="button-bar mt-auto mb-5">
            {buttons.map((btn) => (
              <Col xs="auto" key={btn.key}>
                <Button
                  className={`border-0 fs-3 mx-4 Button-acction ${
                    activeComponent === btn.key ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent(btn.key)}
                >
                  {btn.label}
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </Background>
    </>
  );
};

export default Shipments;
