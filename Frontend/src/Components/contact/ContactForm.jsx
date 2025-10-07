import { Form, Row, Col } from "react-bootstrap";
import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import "../style/Styles.css";

const ContactForm = () => {
  return (
    <Background image="/images/ImageContact.png">
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <Row className="g-4 justify-content-center w-100">
          <Col md={5}>
            <CustomCard title="HACE TU CONSULTA" buttonText="Enviar">
              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="text"
                  placeholder="Ingrese su Nombre"
                />
              </Form.Group>
              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="text"
                  placeholder="Ingrese su Apellido"
                />
              </Form.Group>
              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Correo Electrónico:</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="email"
                  placeholder="abc@ejemplo.com"
                />
              </Form.Group>
              <Form.Group className="inputs-group mb-3 w-bold">
                <Form.Label>Consulta:</Form.Label>
                <Form.Control
                  className="custom-input"
                  as="textarea"
                  placeholder="Escribe tu consulta aquí..."
                />
              </Form.Group>
            </CustomCard>
          </Col>

          <Col md={5}>
            <CustomCard title="CONTACTO">
              <label>
                Dirección: Dorrego 453, Rosario, Santa Fe.
                <br />
                Telefono: +54 123 4567890
                <br />
                Celular: +54 098 7654321
                <br />
                Correo Electrónico: contacto@jemar.com.ar
              </label>
              <div className="mt-3 align-items-center">
                <iframe
                  title="Ubicación en Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.4713068456353!2d-60.64983522442693!3d-32.94941347280553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539c8a48ad55%3A0xc780bd32769b8a12!2sDorrego%20453%2C%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1693685189056!5m2!1ses!2sar"
                  className="map-container"
                ></iframe>
              </div>
            </CustomCard>
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default ContactForm;
