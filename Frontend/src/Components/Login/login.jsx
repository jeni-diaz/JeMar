import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import Background from "../background/Background";
import BackArrow from "../back/BackArrow"
import CustomAlert from "../alert/CustomAlert";
import CustomCard from "../card/CustomCard";
import { initialErrors } from "./Login.data";
import '../style/Styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors);
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: false
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      password: false
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/.test(password);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      emailRef.current.focus();
      return;
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      passwordRef.current.focus();
      return;
    }

    setErrors(initialErrors);

    try {
      const response = await fetch('/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

     if (!response.ok) {
        setAlertData({
          show: true,
          message: data.message || "Error al iniciar sesión",
          type: "error",
        });
        return;
      }

      setAlertData({
        show: true,
        message: "¡Login exitoso!",
        type: "success",
      });

      localStorage.setItem('token', data.token); 

    setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      setAlertData({
        show: true,
        message: "Ocurrió un error al iniciar sesión.",
        type: "error",
      });
    }
  };

  return (
    <Background image="/images/ImageLogin.png">
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <BackArrow/>
        <CustomAlert
          show={alertData.show}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ ...alertData, show: false })}
        />
        <Row>
          <Col>
            <CustomCard title="INICIAR SESIÓN">
              <Form onSubmit={handleSubmit}>
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
                    placeholder=""
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

                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" className="custom-button w-50">
                    Iniciar
                  </Button>
                </div>

                <div className="inputs-group mt-3 text-center">
                  <Form.Label>
                    No tengo cuenta -{" "}
                    <Link
                      to="/register"
                      className="text-decoration-none custom-link"
                    >
                      Registrarme
                    </Link>
                  </Form.Label>
                </div>
              </Form>
            </CustomCard>
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default Login;
