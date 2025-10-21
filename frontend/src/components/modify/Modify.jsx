import { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { AuthContext } from "../authContext/AuthContext";
import { IsTokenValid } from "../protected/Protected.helpers";

import Backgrpund from "../background/Background";
import BackArrow from "../back/BackArrow";
import ModifyState from "./state/ModifyState";
import ModifyRole from "./role/ModifyRole";


const Modify = () => {
  const { role, token } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("");

  const buttonsByRole = {
    superAdmin: ["status", "roles"],
    empleado: ["status"],
  };

    const allowedButtons = token ? buttonsByRole[role] || [] : [];
  
  const buttons = [
    { key: "status", label: "Estados" },
    { key: "roles", label: "Roles" },
  ];

const visibleButtons = buttons.filter((btn) =>
    allowedButtons.includes(btn.key)
  );

  return (
    <>
      <Backgrpund image="/images/ImageModify.png">
        <BackArrow />
        <Container className="d-flex align-items-center min-vh-100 flex-column">

          <div className="screen d-flex justify-content-start w-100">
            <Row>
              <Col>
                {activeComponent === "status" && allowedButtons.includes("status") && <ModifyState />}
                {activeComponent === "roles" && allowedButtons.includes("roles") && <ModifyRole />}
              </Col>
            </Row>
          </div>
          <Row className="button-bar mt-auto mb-3">
            {visibleButtons.map((btn) => (
              <Col xs="auto" key={btn.key}>
                <Button
                  className={`border-0 fs-4 mx-4 Button-acction ${activeComponent === btn.key ? "active" : ""
                    }`}
                  onClick={() => setActiveComponent(btn.key)}
                >
                  {btn.label}
                </Button>
              </Col>
            ))}
          </Row>

        </Container>
      </Backgrpund>
    </>
  );
};

export default Modify;
