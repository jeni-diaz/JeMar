import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";
import BackArrow from "../back/BackArrow";

import "../style/Styles.css";

const Modify = () => {
  const [shipmentNumber, setShipmentNumber] = useState("");
  const [shipmentData, setShipmentData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    // Simulación de búsqueda de envío
    // Aquí podrías llamar a tu API para obtener datos reales
    const foundShipment = {
      number: shipmentNumber,
      status: "En tránsito",
      destination: "Buenos Aires",
      weight: "2kg",
    };

    setShipmentData(foundShipment);
  };

  return (
    <Background image="/images/ImageShipment.png">
      <BackArrow />
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <Row>
          <Col>
            <CustomCard title="CAMBIAR ESTADO">
              <Form onSubmit={handleSearch}>
                <Form.Group className="inputs-group mb-3 fw-bold">
                  <Form.Label>Número de envío</Form.Label>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    placeholder="Ej: 012345678"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" className="custom-button w-50">
                    Buscar
                  </Button>
                </div>
              </Form>
            </CustomCard>
          </Col>

          <Col>
            {shipmentData && (
              <CustomCard title={`ENVÍO ${shipmentData.number}`}>
                

                <div className="d-flex justify-content-center mt-3">
                  <Button className="custom-button w-50">Modificar</Button>
                </div>
              </CustomCard>
            )}
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default Modify;
