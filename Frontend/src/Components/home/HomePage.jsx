import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import Background from "../background/Background";
import CardOne from "./cards/CardOne";
import CardTwo from "./cards/CardTwo";
import CardThree from "./cards/CardThree";
import CardFour from "./cards/CardFour";
import CardFive from "./cards/CardFive";
import CardSix from "./cards/CardSix";

import { AuthContext } from "../authContext/AuthContext";
import "../style/Styles.css";

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const { role, token, user } = useContext(AuthContext);

  // Configuración de roles y botones
  const buttonsByRole = {
    superAdmin: ["shipment", "modify", "panel"],
    empleado: ["shipment", "modify"],
    usuario: ["shipment"],
  };

  const allowedButtons = buttonsByRole[role] || [];

  const buttons = [
    { key: "shipment", label: "Envíos" },
    { key: "modify", label: "Modificar" },
    { key: "panel", label: "Panel" },
  ];

  const routes = {
    shipment: "/shipment",
    modify: "/modify",
    panel: "/panel",
  };

  const handleButtonClick = (buttonKey) => {
    setActiveButton(buttonKey);
    const route = routes[buttonKey];
    if (route) navigate(route);
  };

  return (
    <>
      {/* Sección superior */}
      <Background image="/images/ImageHome.png">
        <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
          {/* Si hay sesión, mostrar saludo y botones */}
          {token ? (
            <>
              <h2 className="text-light mb-4">
                Bienvenido, {user?.name || "Usuario"}
              </h2>
              <Container className="button-bar mt-auto mb-3">
                <Row className="justify-content-center">
                  {buttons
                    .filter((btn) =>
                      allowedButtons.includes(btn.key.toLowerCase())
                    )
                    .map((btn) => (
                      <Col xs="auto" key={btn.key}>
                        <Button
                          className={`border-0 fs-3 mx-4 Button-acction ${
                            activeButton === btn.key ? "active" : ""
                          }`}
                          onClick={() => handleButtonClick(btn.key)}
                        >
                          {btn.label}
                        </Button>
                      </Col>
                    ))}
                </Row>
              </Container>
            </>
          ) : (
            // Si no hay sesión, mostrar solo título genérico
            <h2 className="text-light mb-4">Bienvenido a JeMar</h2>
          )}
        </Container>
      </Background>

      <div className="blackLine"></div>

      {/* Sección inferior con las recomendaciones */}
      <Background image="/images/ImageHome1.png">
        <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
          <h2 className="title-card mt-5" style={{ fontSize: "2.5rem" }}>
            Recomendaciones para embalar tu paquete
          </h2>
          <Row>
            <Col><CardOne /></Col>
            <Col><CardTwo /></Col>
            <Col><CardThree /></Col>
          </Row>
          <Row>
            <Col><CardFour /></Col>
            <Col><CardFive /></Col>
            <Col><CardSix /></Col>
          </Row>
        </div>
      </Background>
    </>
  );
};

export default HomePage;
