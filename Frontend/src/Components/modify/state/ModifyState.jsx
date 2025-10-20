import { useState, useContext } from "react";
import { Form } from "react-bootstrap";

import { AuthContext } from "../../authContext/AuthContext";
import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";
import CustomModal from "../../modal/CustomModal";

const ModifyState = () => {
  const { role, token } = useContext(AuthContext);
  const [shipmentId, setShipmentId] = useState("");
  const [status, setStatus] = useState("");
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
      // Actualizar estado con PUT
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

      // Obtener datos actualizados con GET
      const getResponse = await fetch(
        `http://localhost:3000/api/shipment/${shipmentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = await getResponse.json();

      if (!getResponse.ok)
        throw new Error(updatedData.error || "Error al obtener datos actualizados");

      // Mostrar en el modal
      setModalData(updatedData);
      setShowModal(true);

      // Limpiar campos
      setShipmentId("");
      setStatus("");
    } catch (error) {
      console.error("Error actualizando envío:", error);
      setAlertData({
        show: true,
        message: error.message || "Error desconocido al actualizar el envío.",
        type: "error",
      });
    }
  };

  const modalButtons = [
    {
      label: "Cerrar",
      onClick: () => setShowModal(false),
      className: "btn-secondary",
    },
  ];

  return (
    <>
      <div className="color-bacground d-flex justify-content-center align-items-center flex-column">
        <CustomAlert
          show={alertData.show}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ ...alertData, show: false })}
        />

        <form onSubmit={handleSubmit} className="w-100">
          <CustomCard
            title="MODIFICAR ESTADO"
            buttonText="Modificar"
            buttonType="submit"
          >
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Número envío:</Form.Label>
              <Form.Control
                className="custom-input"
                type="text"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                placeholder="Ej: 3"
              />
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Nuevo Estado:</Form.Label>
              <Form.Select
                className="custom-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Seleccione un Estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="en camino">En camino</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </CustomCard>
        </form>

        {showModal && modalData && (
          <CustomModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title="¡Estado modificado con éxito!"
            body={
              <div>
                {[
                  { label: "Envío N°: ", value: modalData?.id },
                  { label: "Estado: ", value: modalData?.status },
                  { label: "Tipo: ", value: modalData?.type },
                  { label: "Origen: ", value: modalData?.origin },
                  { label: "Destino: ", value: modalData?.destination },
                  {
                    label: "Precio: ",
                    value: modalData?.price
                      ? `$${modalData.price.toLocaleString("es-AR")}`
                      : "",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    {item.label} {item.value}
                  </div>
                ))}
              </div>
            }
            buttons={modalButtons}
          />
        )}
      </div>
    </>
  );
};

export default ModifyState;
