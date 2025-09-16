import { Form } from "react-bootstrap";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import '../style/Styles.css';

function Login() {
  return (
    <>
      <Background image="/images/ImageLogin.jpg">
        <CustomCard
          title="INICIAR SESIÓN"
          buttonText="Iniciar"
        >
          <Form.Group className="imput-group mb-3 w-bold">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              placeholder="abc@ejemplo.com"
            />
          </Form.Group>

          <Form.Group className="imput-group mb-3 w-bold">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              className="custom-input"
              type="password"
              placeholder="********"
            />
          </Form.Group>

          <Form.Group className="imput-group mb-3">
            <Form.Check
              className="custom-checkbox"
              type="checkbox"
              label="Recordar mis datos"
            />
            <p>Registrarme</p>
          </Form.Group>
        </CustomCard>
      </Background>
    </>
  );
}

export default Login;
