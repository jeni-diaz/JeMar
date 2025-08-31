import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Background from "../background/Background";

import '../style/GeneralStyles.css';

function Login() {
    return (
        <Background image="/images/ImageLogin.jpg">
            <Container className="d-flex align-items-center min-vh-100">
                <div className="small-container d-flex flex-column justify-content-center">
                    <Form className="rounded-4 p-5 mx-auto">
                        <h2 className="text-center mb-2 fw-bold">INICIAR SESIÓN</h2>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <Form.Control className="custom-input" type="email" placeholder="abc@ejemplo.com" />
                        </Form.Group>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control className="custom-input" type="password" placeholder="********" />
                        </Form.Group>

                        <Form.Group className="imput-group mb-3">
                            <Form.Check className="custom-checkbox" type="checkbox" label="Recordar mis datos" />
                        </Form.Group>
                        <Button className="custom-button mx-auto w-50 d-flex justify-content-center">Iniciar</Button>

                        <p className="mt-5 text-center small">
                            <a href="#" className="text-decoration-none custom-link">Olvide mi contraseña</a> |
                            <Link to="/register" className="text-decoration-none custom-link ms-1">Registrarme</Link>
                        </p>
                    </Form>
                </div>
            </Container>
        </Background>
    );
}

export default Login;