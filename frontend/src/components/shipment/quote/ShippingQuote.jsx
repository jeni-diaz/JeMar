import { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";

import { initialErrors } from "./ShippingQuote.data";

import CustomModal from "../../modal/CustomModal";
import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";

const ShippingQuote = () => {
  const [shipmentTypes, setShipmentTypes] = useState([]);
  const [shipmentTypeId, setShipmentTypeId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [errors, setErrors] = useState(initialErrors);

  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const shipmentTypesRef = useRef(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
    setErrors((prev) => ({ ...prev, origin: false }));
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    setErrors((prev) => ({ ...prev, destination: false }));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/shipment_type")
      .then((res) => res.json())
      .then((data) => {
        console.log("Tipos cargados:", data);
        setShipmentTypes(data);
      })
      .catch((err) => console.error("Error cargando tipos de envío:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!origin.trim()) {
      setErrors((prev) => ({ ...prev, origin: true }));
      originRef.current.focus();
      return;
    }

    if (!destination.trim()) {
      setErrors((prev) => ({ ...prev, destination: true }));
      destinationRef.current.focus();
      return;
    }

    if (!token) {
      setAlertData({
        show: true,
        message: "Debes iniciar sesión para cotizar un envío.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/shipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shipmentTypeId, origin, destination }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al generar la cotización");

      setModalData(data.shipment);
      setShowModal(true);

      setShipmentTypeId("");
      setOrigin("");
      setDestination("");
    } catch (error) {
      console.error("Error creando envío:", error);
      setAlertData({
        show: true,
        message: "No se puedo generar la cotización.",
        type: "error",
      });
    }
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
            title="COTIZAR ENVÍO"
            buttonText="Cotizar"
            buttonType="submit">
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Tipo de envío:</Form.Label>
              <Form.Select
                className="custom-input"
                value={shipmentTypeId}
                onChange={(e) => setShipmentTypeId(e.target.value)}
              >
                <option value="" disabled hidden>Seleccione un tipo</option>
                {shipmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>

            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Origen:</Form.Label>
              <Form.Control
                ref={originRef}
                className={`custom-input ${errors.origin}`}
                type="text"
                placeholder="Ej: Rosario"
                value={origin}
                onChange={handleOriginChange}
              />
              {errors.origin && (
                  <p className="text-danger mt-1">
                    Debe ingresar un origen
                  </p>
                )}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Destino:</Form.Label>
              <Form.Control
                ref={destinationRef}
                className="custom-input"
                type="text"
                placeholder="Ej: Buenos Aires"
                value={destination}
                onChange={handleDestinationChange}
              />
              {errors.destination && (
                  <p className="text-danger mt-1">
                    Debe ingresar un destino
                  </p>
                )}
            </Form.Group>
          </CustomCard>
        </Form>

        {modalData && (
          <CustomModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title="¡Pedido realizado con éxito!"
            body={
              <div>
                {[
                  { label: "Envío N°: ", value: modalData.id },
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
};

export default ShippingQuote;
