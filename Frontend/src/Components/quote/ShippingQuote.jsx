import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Background from "../background/Background";
import CustomCard from "../card/CustomCard";
import "../style/Styles.css";

const ShippingQuote = () => {
  const [shipmentTypes, setShipmentTypes] = useState([]);
  const [shipmentTypeId, setShipmentTypeId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    fetch("/shipment_type")
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
    let userId = null;

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.id;
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }

    const shipment = {
      user_id: userId,
      shipment_type_id: shipmentTypeId,
      origin,
      destination,
      status: "pendiente",
    };

    try {
      const response = await fetch("/shipment", {
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

      // Resetear formulario
      setShipmentTypeId("");
      setOrigin("");
      setDestination("");
    } catch (error) {
      console.error("Error creando envío:", error);
      alert("Ocurrió un error al generar la cotización.");
    }
  };

  return (
    <Background image="/images/ImageQuote.png">
      <CustomCard title="COTIZAR ENVÍO" buttonText="Cotizar" onButtonClick={handleSubmit}>
        <Form>
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
                  {type.description}
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
        </Form>
      </CustomCard>
    </Background>
  );
};

export default ShippingQuote;
