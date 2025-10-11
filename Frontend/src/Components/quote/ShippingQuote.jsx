import { useState, useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { initialErrors } from "./ShippingQuote.data";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import "../style/Styles.css";

const ShippingQuote = () => {
  const [shippingTypes, setShippingTypes] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [showSecondCard, setShowSecondCard] = useState(false);

  // 🔹 Nuevos estados agregados
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingTypeId, setShippingTypeId] = useState("");

  const shippingTypesRef = useRef(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    fetch("/tipo_envio")
      .then((res) => res.json())
      .then((data) => {
        console.log("tipos cargados:", data);
        setShippingOptions(data);
      })
      .catch((err) => console.error("Error cargando tipos de envío:", err));
  }, []);

  const handleShippingTypesChange = (event) => {
    setShippingTypes(event.target.value);
    setShippingTypeId(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, shippingTypes: false }));
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, origin: false }));
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, destination: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!shippingTypes.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, shippingTypes: true }));
      shippingTypesRef.current.focus();
      return;
    }

    if (!origin.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, origin: true }));
      originRef.current.focus();
      return;
    }

    if (!destination.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, destination: true }));
      destinationRef.current.focus();
      return;
    }

    setShowSecondCard(true);

    const token = localStorage.getItem("token");

    let userId = null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.id;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const shipment = {
      usuario_id: userId,
      shippingTypeId,
      origen,
      destino,
    };

    try {
      const response = await fetch("/envios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(shipment),
      });

      const data = await response.json();
      console.log("Envío creado:", data);
      alert("¡Cotización generada con éxito!");

      setShippingTypeId("");
      setShippingTypes("");
      setOrigin("");
      setDestination("");
    } catch (error) {
      console.error("Error creando envío:", error);
      alert("Ocurrió un error al generar la cotización.");
    }
  };

  return (
    <Background image="/images/ImageQuote.png">
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <Row>
          <Col>
            <CustomCard
              title="COTIZAR ENVÍO"
              buttonText="Cotizar"
              buttonAction={handleSubmit}
            >
              <Form>
                <Form.Group className="inputs-group mb-3 fw-bold">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    ref={emailRef}
                    className={`custom-input ${errors.email}`}
                    type="email"
                    placeholder="abc@ejemplo.com"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-danger mt-1">Debe ingresar un correo electrónico</p>
                  )}
                </Form.Group>

                <Form.Group className="inputs-group mb-3 fw-bold">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    ref={passwordRef}
                    className={`custom-input ${errors.password}`}
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <p className="text-danger mt-1">Debe ingresar una contraseña</p>
                  )}
                </Form.Group>

                <Form.Group className="inputs-group mb-3">
                  <Form.Check
                    className="custom-checkbox"
                    type="checkbox"
                    label="Recordar mis datos"
                  />
                </Form.Group>

                <div className="inputs-group mb-3">
                  <Form.Label>No tengo cuenta - </Form.Label>
                  <Link to="/register" className="text-decoration-none custom-link">Registrarme</Link>
                </div>
              </Form>
            </CustomCard>
          </Col>

          <Col md={4}>
            {showSecondCard && (
              <CustomCard
                title="COTIZACIÓN"
                buttonText="Aceptar"
                onClick={() => setShowSecondCard(false)}
              >
                {/* Contenido */}
              </CustomCard>
            )}
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default ShippingQuote;
