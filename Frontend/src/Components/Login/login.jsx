import { useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { initialErrors } from "./Login.data";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import "../style/Styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrors);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: false,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: false,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      emailRef.current.focus();

      return;
    }

    if (!password.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
      passwordRef.current.focus();
      return;
    }

    setErrors(initialErrors);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Background image="/images/ImageLogin.png">
        <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
          <Row>
            <Col>
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
                    className={`custom-input ${
                      errors.password ? "input-error" : ""
                    }`}
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <p className="text-danger mt-1">
                      Debe ingresar una contraseña
                    </p>
                  )}
                </Form.Group>

                <Form.Group className="inputs-group mb-3">
                  <Form.Check
                    className="custom-checkbox"
                    type="checkbox"
                    label="Recordar mis datos"
                  />
                </Form.Group>

                <div className="inputs-group mb-3">
                  <Form.Label>No tengo cuenta - </Form.Label>
                  <Link
                    to="/register"
                    className="text-decoration-none custom-link"
                  >
                    {" "}
                    Registrarme
                  </Link>
                </div>
              </CustomCard>
            </Col>
          </Row>
        </div>
      </Background>
    </>
  );
};

export default Login;
