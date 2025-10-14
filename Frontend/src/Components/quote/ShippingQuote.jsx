import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Background from "../background/Background";
import CustomCard from "../card/CustomCard";
import "../style/Styles.css";

const ShippingQuote = () => {
  const [shipmentTypes, setShipmentTypes] = useState([]);
  const [shipmentTypeId, setShipmentTypeId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  // Load shipment types
  useEffect(() => {
    fetch("/shipment_type")
      .then((res) => res.json())
      .then((data) => {
        console.log("Shipment types loaded:", data);
        setShipmentTypes(data);
      })
      .catch((err) => console.error("Error loading shipment types:", err));
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
        console.error("Error decoding token:", error);
      }
    }

    const shipment = {
      user_id: userId,
      shipment_type_id: shipmentTypeId,
      origin,
      destination,
      shipment_date: new Date(),
      status: "pending",
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
      console.log("Shipment created:", data);
      alert("Shipment quote created successfully!");

      // Clear form
      setShipmentTypeId("");
      setOrigin("");
      setDestination("");
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("An error occurred while creating the shipment.");
    }
  };

  return (
    <Background image="/images/ImageQuote.jpg">
      <CustomCard title="COTIZAR ENVIO" buttonText="Cotizar" onButtonClick={handleSubmit}> 
        <Form>
          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Tipo de envío:</Form.Label> 
            <Form.Select
              className="custom-input"
              value={shipmentTypeId}
              onChange={(e) => setShipmentTypeId(e.target.value)}
            >
              {shipmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.description}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Origen:</Form.Label> 
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ej: Rosario" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
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
