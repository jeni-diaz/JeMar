import { Container, Form, Button } from 'react-bootstrap';

import Background from "../background/Background";


import './login.css';

function Login() {
    return (
        <Background image="/images/ImageLogin.svg">
            <Container className="d-flex align-items-center min-vh-100">
                <div className="small-container">
                    <Form className='rounded-4 p-5'>
                        <h2 className="text-center mb-4 fw-bold">INICIAR SESIÓN</h2>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Correo Electrónico</Form.Label>
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
                            <a href="#" className="text-decoration-none custom-link ms-1">Registrarme</a>
                        </p>
                    </Form>
                </div>
            </Container>
        </Background>
    );
}

export default Login;