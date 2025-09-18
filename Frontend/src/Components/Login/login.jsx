import { useState, useRef } from "react";
import { Form} from 'react-bootstrap';

import { initialErrors } from "./Login.data";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import '../style/Styles.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors)

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: false
    }))
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      password: false
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.length) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: true
      }))
      emailRef.current.focus();

      return;
    }

    if (!password.length) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: true
      }))
      passwordRef.current.focus();
      return;
    }

    setErrors(initialErrors);
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <Background image="/images/ImageLogin.jpg">
        <CustomCard
          title="INICIAR SESIÓN"
          buttonText="Iniciar"
          buttonAction={handleSubmit}
        >
          <Form.Group className="inputs-group mb-3 w-bold">
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
              <p className="text-danger mt-1">Debe ingresar un correo</p>
            )}

          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              ref={passwordRef}
              className={`custom-input ${errors.password ? 'input-error' : ''}`}
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

          <Form.Group className="inputs-group mb-3">
            <Form.Check
              className="custom-checkbox"
              type="checkbox"
              label="Recordar mis datos"
            />
          </Form.Group>
        </CustomCard>
      </Background>
    </>
  );
}

export default Login;
