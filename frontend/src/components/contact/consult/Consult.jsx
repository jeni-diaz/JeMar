import { Form } from "react-bootstrap";
import { useRef, useState } from "react";

import { initialErrors } from "./Consult.data";

import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";

const Consult = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrors((prev) => ({ ...prev, firstName: false }));
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setErrors((prev) => ({ ...prev, lastName: false }));
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };
  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setErrors((prev) => ({ ...prev, message: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName.trim()) {
      setErrors((prev) => ({ ...prev, firstName: "Debe ingresar un nombre" }));
      firstNameRef.current.focus();
      return;
    }
    if (!lastName.trim()) {
      setErrors((prev) => ({ ...prev, lastName: "Debe ingresar un apellido" }));
      lastNameRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Debe ingresar un correo electrónico válido" }));
      emailRef.current.focus();
      return;
    }

    if (!validateMessage(message)) {
      setErrors((prev) => ({ ...prev, message: "Debe ingresar una consulta" }));
      messageRef.current.focus();
      return;
    }
const consult = { firstName, lastName, email, consult };

    try {
      const response = await fetch("http://localhost:3000/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify(consult),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlertData({
          show: true,
          message: data.message || "Error cargando la consulta",
          type: "error",
        });
        return;
      }
      setAlertData({
        show: true,
        message: "Consulta registrada con exito",
        type: "success",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setErrors(initialErrors);

    } catch (error) {
      console.error("Error cargando consulta:", error);
      setAlertData({
        show: true,
        message: "Ocurrio un error cargando su consulta",
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
          onClose={() => setAlertData({ show: false, message: "", type: "info" })}
        />
        <Form onSubmit={handleSubmit}>
          <CustomCard
            title="HACE TU CONSULTA"
            buttonText="Enviar"
            buttonType="submit"
          >
            <Form.Group className="inputs-group mb-3 w-bold">
              <Form.Label>Nombre: <span className="text-danger">*</span></Form.Label>
              <Form.Control
                ref={firstNameRef}
                className={`custom-input ${errors.firstName ? 'is-invalid' : ''}`}
                type="text"
                placeholder="Ingrese su nombre"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {errors.firstName && (
                <p className="text-danger mt-1 text-center">{errors.firstName}</p>
              )}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 w-bold">
              <Form.Label>Apellido: <span className="text-danger">*</span></Form.Label>
              <Form.Control
                ref={lastNameRef}
                className={`custom-input ${errors.lastName ? 'is-invalid' : ''}`}
                type="text"
                placeholder="Ingrese su apellido"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {errors.lastName && (
                <p className="text-danger mt-1 text-center">{errors.lastName}</p>
              )}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 w-bold">
              <Form.Label>Correo Electrónico: <span className="text-danger">*</span></Form.Label>
              <Form.Control
                ref={emailRef}
                className={`custom-input ${errors.email ? 'is-invalid' : ''}`}
                type="email"
                placeholder="abc@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-danger mt-1 text-center">{errors.email}</p>
              )}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 w-bold">
              <Form.Label>Consulta: <span className="text-danger">*</span></Form.Label>
              <Form.Control
                ref={messageRef}
                className={`custom-input ${errors.message ? 'is-invalid' : ''}`}
                as="textarea"
                rows={2}
                placeholder="Escribe tu consulta aquí..."
                value={message}
                onChange={handleMessageChange}
              />
              {errors.message && (
                <p className="text-danger mt-1 text-center">{errors.message}</p>
              )}
            </Form.Group>
          </CustomCard>
        </Form>
      </div>
    </>
  );
};

export default Consult;
