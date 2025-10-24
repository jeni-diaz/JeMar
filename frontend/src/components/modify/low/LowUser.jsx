import { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";
import CustomModal from "../../modal/CustomModal";
import { AuthContext } from "../../authContext/AuthContext";

const LowUser = () => {
  const { token, role } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [alertData, setAlertData] = useState({ show: false, message: "", type: "info" });
  const [showModal, setShowModal] = useState(false);

  if (role !== "superAdmin") {
    return <h3 className="text-center mt-5">No tenés permiso para acceder a esta sección.</h3>;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setAlertData({ show: false, message: "", type: "info" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertData({ show: true, message: "Por favor ingrese un email válido.", type: "danger" });
      return;
    }

     try {
    const response = await fetch(`http://localhost:3000/api/user/verify/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    const data = await response.json();

    if (!response.ok) {
      setAlertData({ show: true, message: data.error, type: "danger" });
      return;
    }

    setShowModal(true);
    
     } catch (error) {
    setAlertData({ show: true, message: "Error al verificar el usuario.", type: "danger" });
  }
  };

  const Delete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${email}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

    if (!response.ok) {
      setAlertData({ show: true, message: data.error, type: "danger" });
      setShowModal(false);
    } else {
      setAlertData({ show: true, message: data.message, type: "success" });
      setEmail("");
      setShowModal(false);
    }
  } catch (error) {
    setAlertData({ show: true, message: "Error de conexión con el servidor.", type: "danger" });
    setShowModal(false); 
  }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {alertData.show && (
        <CustomAlert show={alertData.show} message={alertData.message} type={alertData.type} />
      )}

      <form onSubmit={handleSubmit}>
        <CustomCard title="DESHABILITAR USUARIO" buttonText="Eliminar" buttonType="submit">
          <Form.Group className="inputs-group mb-3 fw-bold">
            <Form.Label>Email del usuario:</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="usuario@ejemplo.com"
            />
          </Form.Group>
        </CustomCard>
      </form>

      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Confirmar baja"
        body={`¿Estás seguro que deseas eliminar al usuario con email ${email}?`}
        onConfirm={Delete}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default LowUser;
