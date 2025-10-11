import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

import { initialErrors } from "./UserRegister.data";

import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import CustomCard from "../card/CustomCard";
import CustomAlert from "../alert/CustomAlert";

import "../style/Styles.css";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
    setErrors((prev) => ({ ...prev, lastname: false }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: true }));
      nameRef.current.focus();
      return;
    }

    if (!lastname.trim()) {
      setErrors((prev) => ({ ...prev, lastname: true }));
      lastnameRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      emailRef.current.focus();
      return;
    }

    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: true }));
      passwordRef.current.focus();
      return;
    }

    const usuario = { nombre: name, apellido: lastname, email, password };

    try {
      const response = await fetch("/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlertData({
          show: true,
          message: data.message || "Error en el registro",
          type: "error",
        });
        return;
      }

      setAlertData({
        show: true,
        message: "Registro exitoso",
        type: "success",
      });

      setName("");
      setLastname("");
      setEmail("");
      setPassword("");
      setErrors(initialErrors);
    } catch (error) {
      console.error("Error registrando usuario:", error);
      setAlertData({
        show: true,
        message: "Ocurrió un error al registrarse.",
        type: "error",
      });
    }
  };

  return (
    <Background image="/images/ImageRegister.png">
       <BackArrow/>
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <CustomAlert
          show={alertData.show}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ ...alertData, show: false })}
        />
        <CustomCard title="REGISTRATE">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                ref={nameRef}
                className={`custom-input ${errors.name}`}
                type="text"
                placeholder="Ingrese su Nombre"
                value={name}
                onChange={handleNameChange}
                autoComplete="name"
              />
              {errors.name && <p className="text-danger mt-1">Debe ingresar un nombre</p>}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                ref={lastnameRef}
                className={`custom-input ${errors.lastname}`}
                type="text"
                placeholder="Ingrese su Apellido"
                value={lastname}
                onChange={handleLastnameChange}
                autoComplete="family-name"
              />
              {errors.lastname && <p className="text-danger mt-1">Debe ingresar un apellido</p>}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                ref={emailRef}
                className={`custom-input ${errors.email}`}
                type="email"
                placeholder="abc@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-danger mt-1">Debe ingresar un correo electrónico válido</p>
              )}
            </Form.Group>

            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                ref={passwordRef}
                className={`custom-input ${errors.password}`}
                type="password"
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
              {errors.password && <p className="text-danger mt-1">Debe ingresar una contraseña</p>}
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button type="submit" className="custom-button w-50">
                Continuar
              </Button>
            </div>
          </Form>
        </CustomCard>
      </div>
    </Background>
  );
};

export default UserRegister;
