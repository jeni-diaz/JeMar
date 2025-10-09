import { useRef, useState } from "react";
import { Form } from "react-bootstrap";

import { initialErrors } from "./UserRegister.data";
import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import "../style/Styles.css";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrors);

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, name: false }));
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, lastname: false }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: false }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrorsv) => ({ ...prevErrors, password: false }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }));
      nameRef.current.focus();
      return;
    }

    if (!lastname.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, lastname: true }));
      lastnameRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prevErrorsv) => ({ ...prevErrors, email: true }));
      emailRef.current.focus();
      return;
    }

    if (!password.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      passwordRef.current.focus();
      return;
    }

    setErrors(initialErrors);
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <Background image="/images/ImageRegister.png">
      <CustomCard
        title="REGISTRATE"
        buttonText="Continuar"
        buttonAction={handleSubmit}
      >

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
          {errors.name && (
            <p className="text-danger mt-1 ">Debe ingresar un nombre</p>
          )}
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
          {errors.lastname && (
            <p className="text-danger mt-1">Debe ingresar un apellido</p>
          )}
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
            <p className="text-danger mt-1">Debe ingresar un correo electrónico</p>
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
          {errors.password && (
            <p className="text-danger mt-1">Debe ingresar una contraseña</p>
          )}
        </Form.Group>
      </CustomCard>
    </Background>
  );
};

export default UserRegister;
