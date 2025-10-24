import { useState, useContext, useRef } from "react";
import { Form } from "react-bootstrap";
import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";
import CustomModal from "../../modal/CustomModal";
import { AuthContext } from "../../authContext/AuthContext";

const LowUser = () => {
  const { token, role } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [alertData, setAlertData] = useState({ show: false, message: "", type: "info" });
  const [showModal, setShowModal] = useState(false);
  const emailRef = useRef(null);

  if (role !== "superAdmin") {
    return <h3 className="text-center mt-5">No tenés permiso para acceder a esta sección.</h3>;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ email: "" });
    setAlertData({ show: false, message: "", type: "info" });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrors({ email: "Debe ingresar un correo electrónico" });
      emailRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Debe ingresar un email válido" });
      emailRef.current.focus();
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/verify/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        setAlertData({ show: true, message: data.error, type: "error" });
        return;
      }

      setShowModal(true);
    } catch (error) {
      setAlertData({ show: true, message: "Error al verificar el usuario.", type: "error" });
    }
  };

  const Delete = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlertData({ show: true, message: data.error, type: "error" });
      } else {
        setAlertData({ show: true, message: data.message, type: "success" });
        setEmail("");
      }

      setTimeout(() => setShowModal(false), 150);

    } catch (error) {
      setAlertData({
        show: true,
        message: "Error de conexión con el servidor.",
        type: "error",
      });
      setShowModal(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {alertData.show && (
        <CustomAlert
          show={alertData.show}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ show: false, message: "", type: "info" })}
        />
      )}
      <form noValidate onSubmit={handleSubmit}>
        <CustomCard title="DESHABILITAR USUARIO" buttonText="Eliminar" buttonType="submit">
          <Form.Group className="inputs-group mb-3 fw-bold">
            <Form.Label>Email del usuario:</Form.Label>
            <Form.Control
              ref={emailRef}
              className={`custom-input ${errors.email ? "is-invalid" : ""}`}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="usuario@ejemplo.com"
            />
            {errors.email && (
              <p className="text-danger mt-1 text-center">{errors.email}</p>
            )}
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
