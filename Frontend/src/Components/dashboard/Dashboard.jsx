import { useState } from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import ShipmentsTable from "./shipmentsTable/ShipmentsTable";
import UsersTable from "./usersTable/UsersTable";

function Dashboard() {
   const [activeComponent, setActiveComponent] = useState("");

  const buttons = [
    { key: "shipments", label: "Envíos" },
    { key: "users", label: "Usuarios" },
  ];


  return (
    <Background image="/images/ImageShipment.png">
        <BackArrow />
    <Container className="d-flex align-items-center min-vh-100 flex-column">

          <div className="d-flex p-5 mt-4 w-100">
            <Row>
              <Col>
                {activeComponent === "shipments" && <ShipmentsTable/>}
                {activeComponent === "users" && <UsersTable/>}
              </Col>
            </Row>
          </div>

          <Row className="button-bar mt-auto mb-3">
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
  );
}

export default Dashboard;