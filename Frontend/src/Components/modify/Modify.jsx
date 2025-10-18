import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { AuthContext } from "../authContext/AuthContext";

import Backgrpund from "../background/Background";
import BackArrow from "../back/BackArrow";
import CustomCard from "../card/CustomCard";
import CustomAlert from "../alert/CustomAlert";
import CustomModal from "../modal/CustomModal";

const Modify = () => {
  const { role, token } = useContext(AuthContext);
  const [shipmentId, setShipmentId] = useState("");
  const [status, setStatus] = useState("");
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  if (role !== "empleado" && role !== "superAdmin") {
    return (
      <h3 className="text-center mt-5">
        No tenés permiso para acceder a esta sección.
      </h3>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/shipment/${shipmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Error al actualizar estado");

      setModalData({
        id: shipmentId,
        status: status,
        type: data.type || "N/A",
        origin: data.origin || "N/A",
        destination: data.destination || "N/A",
        price: data.price || 0,
      });
      setShowModal(true);

      setShipmentId("");
      setStatus("");
    } catch (error) {
      console.error("Error actualizando envío:", error);
      setAlertData({
        show: true,
        message: "Ocurrió un error al actualizar el estado del envío.",
        type: "error",
      });
    }
  };

  return (
    <Backgrpund image="/images/ImageModify.png">
      <BackArrow />
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <CustomAlert
          {...alertData}
          onClose={() => setAlertData({ ...alertData, show: false })}
        />
        <CustomCard title="MODIFICAR ESTADO">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>ID del envío:</Form.Label>
              <Form.Control
                className="custom-input"
                type="text"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                placeholder="Ej: 3"
              />
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Nuevo estado:</Form.Label>
              <Form.Select
                className="custom-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Seleccione un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="en camino">En camino</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button type="submit" className="custom-button w-50">
                Actualizar
              </Button>
            </div>
          </Form>
        </CustomCard>
      </div>
    </Backgrpund>
  );
};

export default Modify;
