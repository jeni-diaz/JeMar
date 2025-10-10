import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Background from "../background/Background";
import CustomCard from "../card/CustomCard";
import '../style/Styles.css';

const UserRegister = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // evitar reload

    const usuario = { nombre, apellido, email, password };

    try {
      const response = await fetch('/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      const data = await response.json();
      console.log('Usuario registrado:', data);

      setNombre('');
      setApellido('');
      setEmail('');
      setPassword('');
      alert('Registro exitoso!');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Ocurrió un error al registrarse.');
    }
  };

  return (
    <Background image="/images/ImageRegister.jpg">
      <CustomCard title="REGISTRATE">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ingrese su Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ingrese su Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              placeholder="abc@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              className="custom-input"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mt-2">Continuar</Button>
        </Form>
      </CustomCard>
    </Background>
  );
};

export default UserRegister;
