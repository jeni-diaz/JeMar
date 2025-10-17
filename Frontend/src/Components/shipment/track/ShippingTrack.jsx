import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import CustomAlert from "../../alert/CustomAlert";
import CustomCard from "../../card/CustomCard";

function ShippingTrack() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [errors, setErrors] = useState({ trackingNumber: false });
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const trackingNumberRef = useRef(null);

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, trackingNumber: false }));
  };

  const validateTrackingNumber = (num) => /^\d+$/.test(num);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateTrackingNumber(trackingNumber)) {
      setErrors((prevErrors) => ({ ...prevErrors, trackingNumber: true }));
      trackingNumberRef.current.focus();
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setAlertData({
        show: true,
        message: "Debes iniciar sesión para consultar tu envío.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/shipment/${trackingNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se encontró el envío");
      }

      setAlertData({
        show: true,
        message: `📦 Envío N° ${data.id}\nEstado: ${data.status}\nTipo: ${data.type}\nOrigen: ${data.origin}\nDestino: ${data.destination}\nPrecio: $${data.price.toLocaleString("es-AR")}`,
        type: "success",
      });

      setTrackingNumber("");
    } catch (error) {
      console.error("💥 Error consultando envío:", error);
      setAlertData({
        show: true,
        message: error.message || "Error consultando el envío.",
        type: "error",
      });
    }
  };

  return (
    <>
      <CustomAlert
        show={alertData.show}
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ ...alertData, show: false })}
      />

      <CustomCard title="RASTREAR ENVÍO">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="inputs-group mb-3 fw-bold">
            <Form.Label>Número de ID del envío:</Form.Label>
            <Form.Control
              ref={trackingNumberRef}
              className={`custom-input ${errors.trackingNumber ? "is-invalid" : ""}`}
              type="text"
              placeholder="Ej: 1"
              value={trackingNumber}
              onChange={handleTrackingNumberChange}
            />
            {errors.trackingNumber && (
              <p className="text-danger mt-1">Debe ingresar un ID numérico válido</p>
            )}
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button type="submit" className="custom-button w-50">
              Consultar Estado
            </Button>
          </div>
        </Form>
      </CustomCard>
    </>
  );
}

export default ShippingTrack;
