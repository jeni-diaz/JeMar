import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { initialErrors } from "./ShippingTrack.data";

import CustomAlert from "../../alert/CustomAlert";
import CustomCard from "../../card/CustomCard";

function ShippingTrack() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [errors, setErrors] = useState(initialErrors);
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

  const validateTrackingNumber = (num) => /^\d{8}$/.test(num);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateTrackingNumber(trackingNumber)) {
      setErrors((prevErrors) => ({ ...prevErrors, trackingNumber: true }));
      trackingNumberRef.current.focus();
      return;
    }
  };

  return (
<>
      <CustomCard title="RASTREAR ENVÍO">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="inputs-group mb-3 w-bold ">
            <Form.Label>Número de seguimiento:</Form.Label>
            <Form.Control
              ref={trackingNumberRef}
              className={`custom-input ${errors.trackingNumber ? "is-invalid" : ""}`}
              type="text"
              placeholder="Ej: 123456"
              value={trackingNumber}
              onChange={handleTrackingNumberChange}
              autoComplete="trackingNumber"
            />
            {errors.trackingNumber && (
              <p className="text-danger mt-1">
                Debe ser un número de 20 dígitos
              </p>
            )}
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button type="submit" className="custom-button w-50">
              Rastrear
            </Button>
          </div>
        </Form>
      </CustomCard>
    </>
  );
}

export default ShippingTrack;
