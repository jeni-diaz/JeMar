import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CustomModal from "../../modal/CustomModal"

import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";

const ShippingQuote = () => {
  const [shipmentTypes, setShipmentTypes] = useState([]);
  const [shipmentTypeId, setShipmentTypeId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/shipment_type")
      .then((res) => res.json())
      .then((data) => {
        console.log("Tipos cargados:", data);
        setShipmentTypes(data);
      })
      .catch((err) => console.error("Error cargando tipos de envío:", err));
  }, []);


    const shipmentPrices = {
    estandar: 25000,
    express: 40000,
    fragil: 60000,
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

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

    if (!response.ok) {
      throw new Error(data.error || "Error al generar la cotización");
    }

    // Buscar el tipo seleccionado para mostrar el precio
    const selectedType = shipmentTypes.find(
      (type) => type.id === parseInt(shipmentTypeId)
    );
    const price = shipmentPrices[selectedType.name];

    setAlertData({
  show: true,
  message: `✅ Cotización generada con éxito.\nEnvío N° ${data.shipment.id} — Precio: $${data.shipment.price.toLocaleString("es-AR")}`,
  type: "success",
});


    setShipmentTypeId("");
    setOrigin("");
    setDestination("");
  } catch (error) {
    console.error("Error creando envío:", error);
    setAlertData({
      show: true,
      message: "Ocurrió un error al generar la cotización.",
      type: "error",
    });
  }
};


  return (
    <>
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <CustomAlert
          show={alertData.show}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ ...alertData, show: false })}
        />
            <CustomCard title="COTIZAR ENVÍO">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="inputs-group mb-3 fw-bold">
                  <Form.Label>Tipo de envío:</Form.Label>
                  <Form.Select
                    className="custom-input"
                    value={shipmentTypeId}
                    onChange={(e) => setShipmentTypeId(e.target.value)}
                  >
                    <option value="">Seleccione un tipo</option>
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
                    className="custom-input"
                    type="text"
                    placeholder="Ej: Rosario"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="inputs-group mb-3 fw-bold">
                  <Form.Label>Destino:</Form.Label>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    placeholder="Ej: Buenos Aires"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" className="custom-button w-50">
                    Cotizar
                  </Button>
                </div>
              </Form>
            </CustomCard>
      </div>
    </>
  );
};

export default ShippingQuote;
