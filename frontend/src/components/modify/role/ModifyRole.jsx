import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { AuthContext } from "../../authContext/AuthContext";

import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";
import CustomModal from "../../modal/CustomModal";


const ModifyRole = () => {
  const { role, token } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [alertData, setAlertData] = useState({ show: false, message: "", type: "info" });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  if (role !== "superAdmin") {
    return <h3 className="text-center mt-5">Solo los super administradores pueden acceder al panel.</h3>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/changeRole", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, newRole }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al cambiar el rol");

      setModalData({
      show: true,
      message: data.message,
      email: data.user.email,
      role: data.user.newRole,
    });

      setShowModal(true);
      setEmail("");
      setNewRole("");
    } catch (error) {
      console.error("Error cambiando rol:", error);
      setAlertData({
        show: true,
        message: "Ocurrió un error al cambiar el rol del usuario.",
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
            title="MODIFICAR ROL"
            buttonText="Modificar"
            buttonType="submit">
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Email del usuario:</Form.Label>
              <Form.Control
                className="custom-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
              />
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Nuevo Rol:</Form.Label>
              <Form.Select
                className="custom-input"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="">Seleccione un Rol</option>
                <option value="usuario">Usuario</option>
                <option value="empleado">Empleado</option>
                <option value="superAdmin">Super Admin</option>
              </Form.Select>
            </Form.Group>

          </CustomCard>
        </Form>

        {modalData && (
          <CustomModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title="¡Rol modificado con éxito!"
            body={
              <div>
                <p><strong>Email:</strong> {modalData.email}</p>
                <p><strong>Nuevo Rol:</strong> {modalData.role}</p>
              </div>
            }
            buttons={[
              {
                label: "Cerrar",
                onClick: () => setShowModal(false),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default ModifyRole;