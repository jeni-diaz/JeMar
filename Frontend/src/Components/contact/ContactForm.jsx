import { Form, Row, Col, Button } from "react-bootstrap";
import { useRef, useState } from "react";

import { initialErrors } from "./Contact.data";

import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import CustomCard from "../card/CustomCard";
import CustomAlert from "../alert/CustomAlert";

import "../style/Styles.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Validaciones
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMessage = (msg) => msg.trim() !== "";

  // Handlers
  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setErrors((prev) => ({ ...prev, message: false }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: true }));
      nameRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      emailRef.current.focus();
      return;
    }

    if (!validateMessage(message)) {
      setErrors((prev) => ({ ...prev, message: true }));
      messageRef.current.focus();
      return;
    }

    setAlertData({
      show: true,
      message: "Consulta enviada",
      type: "success",
    });

    setName("");
    setEmail("");
    setMessage("");
    setErrors(initialErrors);
  };

  return (
    <Background image="/images/ImageContact.png">
      <BackArrow />
      <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <CustomAlert
          show={alertData.show}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ ...alertData, show: false })}
        />
        <Row className="justify-content-center w-100">
          <Col md={6}>
            <CustomCard title="HACE TU CONSULTA">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="inputs-group mb-3 w-bold">
                  <Form.Label>Nombre y Apellido:</Form.Label>
                  <Form.Control
                    ref={nameRef}
                    className={`custom-input ${errors.name}`}
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {errors.name && (
                    <p className="text-danger mt-1">
                      Debe ingresar un nombre y apellido
                    </p>
                  )}
                </Form.Group>

                <Form.Group className="inputs-group mb-3 w-bold">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    ref={emailRef}
                    className={`custom-input ${errors.email}`}
                    type="email"
                    placeholder="abc@ejemplo.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <p className="text-danger mt-1">
                      Debe ingresar un correo electrónico
                    </p>
                  )}
                </Form.Group>

                <Form.Group className="inputs-group mb-3 w-bold">
                  <Form.Label>Consulta:</Form.Label>
                  <Form.Control
                    ref={messageRef}
                    className={`custom-input ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    as="textarea"
                    placeholder="Escribe tu consulta aquí..."
                    value={message}
                    onChange={handleMessageChange}
                  />
                  {errors.message && (
                    <p className="text-danger mt-1">Debe ingresar un mensaje</p>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" className="custom-button w-50">
                    Enviar
                  </Button>
                </div>
              </Form>
            </CustomCard>
          </Col>

          <Col md={4}>
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
