import { Form } from "react-bootstrap";

import Background from "../background/Background";
import CustomCard from "../card/CustomCard";

import '../style/Styles.css';

const UserRegister = () => {
  
  return (
    <>
      <Background image="/images/ImageRegister.jpg">
        <CustomCard
          title="REGISTRATE"
          buttonText="Continuar"
        >
          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ingrese su Nombre"
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ingrese su Apellido"
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              placeholder="abc@ejemplo.com"
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              className="custom-input"
              type="password"
              placeholder="********"
            />
          </Form.Group>
        </CustomCard>
      </Background>
    </>
  );
}

export default UserRegister;
