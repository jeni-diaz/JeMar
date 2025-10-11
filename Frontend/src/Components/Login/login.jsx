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
    setErrors((prevErrors) => ({ ...prevErrors, email: false }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: false }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      emailRef.current.focus();
      return;
    }

    if (!password.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      passwordRef.current.focus();
      return;
    }

    setErrors(initialErrors);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al iniciar sesión");
        return;
      }

      alert("Login exitoso!");
      localStorage.setItem("token", data.token);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      alert("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <Background image="/images/ImageLogin.png">
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <Row>
          <Col>
            <CustomCard title="INICIAR SESIÓN" buttonText="Iniciar" buttonAction={handleSubmit}>
              <Form>
                <Form.Group className="inputs-group mb-3 fw-bold">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    ref={emailRef}
                    className={`custom-input ${errors.email ? "is-invalid" : ""}`}
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
                    className={`custom-input ${errors.password ? "is-invalid" : ""}`}
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

                <div className="inputs-group mb-3">
                  <Form.Label>No tengo cuenta - </Form.Label>
                  <Link to="/register" className="text-decoration-none custom-link"> Registrarme</Link>
                </div>
              </Form>
            </CustomCard>
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default Login;
