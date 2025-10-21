import { useState, useRef } from "react";
import { Form } from "react-bootstrap";

import CustomAlert from "../../alert/CustomAlert";
import CustomCard from "../../card/CustomCard";
import CustomModal from "../../modal/CustomModal";

function ShippingTrack() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [errors, setErrors] = useState({ trackingNumber: false });
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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

      setModalData(data);
      setShowModal(true);
      setTrackingNumber("");
    } catch (error) {
      console.error("Error consultando envío:", error);
      setAlertData({
        show: true,
        message: error.message || "Error consultando el envío.",
        type: "error",
      });
    }
  };

  const handleDelete = () => {
    console.log("Eliminar envío", modalData?.id);
    setShowModal(false);
  };

  return (
    <>
    <div className="color-bacground d-flex justify-content-center align-items-center flex-column">
      <CustomAlert
        show={alertData.show}
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ ...alertData, show: false })}
      />
        <Form onSubmit={handleSubmit}>
          <CustomCard
            title="CONSULTAR ESTADO"
            buttonText="Consultar"
            buttonType="submit">
          <Form.Group className="inputs-group mb-3 fw-bold">
            <Form.Label>Número de envío:</Form.Label>
            <Form.Control
              ref={trackingNumberRef}
              className={`custom-input ${
                errors.trackingNumber ? "is-invalid" : ""
              }`}
              type="text"
              placeholder="Ej: 1"
              value={trackingNumber}
              onChange={handleTrackingNumberChange}
            />
            {errors.trackingNumber && (
              <p className="text-danger mt-1">
                Debe ingresar un número
              </p>
            )}
          </Form.Group>
            </CustomCard>
        </Form>


      {modalData && (
        <CustomModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Seguimiento de envío"
          body={
            <div>
              {[
                { label: "Envío N°: ", value: modalData.id },
                { label: "Estado: ", value: modalData.status },
                { label: "Tipo: ", value: modalData.type },
                { label: "Origen: ", value: modalData.origin },
                { label: "Destino: ", value: modalData.destination },
                {
                  label: "Precio: ",
                  value: `$${modalData.price.toLocaleString("es-AR")}`,
                },
              ].map((item, index) => (
                <div key={index}>
                  {item.label} {item.value}
                </div>
              ))}
            </div>
          }
         
        />
      )}
      </div>
    </>
  );
}

export default ShippingTrack;
