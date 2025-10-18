import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { AuthContext } from "../authContext/AuthContext";

import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import CustomCard from "../card/CustomCard";
import CustomAlert from "../alert/CustomAlert";


const Dashboard = () => {
  const { role, token } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [alertData, setAlertData] = useState({ show: false, message: "", type: "info" });

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

      setAlertData({
        show: true,
        message: `Rol del usuario ${email} actualizado a: ${newRole}`,
        type: "success",
      });

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
    <Background image="/images/ImageDashboard.png">
      <BackArrow />
    <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
      <CustomAlert {...alertData} onClose={() => setAlertData({ ...alertData, show: false })} />
      <CustomCard title="CAMBIAR ROL">
        <Form onSubmit={handleSubmit}>
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
            <Form.Label>Nuevo rol:</Form.Label>
            <Form.Select
              className="custom-input"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="">Seleccione un rol</option>
              <option value="usuario">Usuario</option>
              <option value="empleado">Empleado</option>
              <option value="superAdmin">Super Admin</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button type="submit" className="custom-button w-50">
              Cambiar
            </Button>
          </div>
        </Form>
      </CustomCard>
    </div>
    </Background>
    </>
  );
};

export default Dashboard;