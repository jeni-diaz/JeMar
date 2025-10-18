import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";

const DeleteShipping = () => {
  const [shipmentId, setShipmentId] = useState("");
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const shipmentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shipmentId.trim()) {
      setAlertData({
      
        show: true,
        message: "Debes ingresar un número de envío válido.",
        type: "error",
      });
      shipmentRef.current.focus();
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setAlertData({
        show: true,
        message: "No tienes permisos para eliminar envíos.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/shipment/${shipmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar el envío");
      }

      setAlertData({
        show: true,
        message: data.message || "Envío eliminado correctamente.",
        type: "success",
      });

      setShipmentId("");
    } catch (error) {
      console.error("Error eliminando envío:", error);
      setAlertData({
        show: true,
        message: error.message || "Ocurrió un error al eliminar el envío.",
        type: "error",
      });
    }
  };

  return (
    <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
      <CustomAlert
        show={alertData.show}
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ ...alertData, show: false })}
      />
      <CustomCard title="ELIMINAR ENVÍO">
        <Form onSubmit={handleSubmit}>
         <Form.Group className="inputs-group mb-3 fw-bold">
            <Form.Label>Número de envío</Form.Label>
            <Form.Control
              ref={shipmentRef}
              className="custom-input"
              type="text"
              placeholder="Ej: 1"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button type="submit" className="custom-button w-50">
              Eliminar
            </Button>
          </div>
        </Form>
      </CustomCard>
    </div>
  );
};

export default DeleteShipping;