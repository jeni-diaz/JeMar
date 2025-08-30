import { Container, Form, Button } from 'react-bootstrap';

import Background from "../background/Background";

import './UserRegister.css';

function UserRegister() {
    return (
        <Background image="/images/ImagenRegister.svg">
            <Container className="d-flex align-items-center min-vh-100">
                <div className="small-container">
                    <Form className='rounded-4 p-5'>
                        <h2 className="text-center mb-4 fw-bold">REGISTRARME</h2>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control className="custom-input" type="text" placeholder="Ingrese su Nombre" />
                        </Form.Group>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control className="custom-input" type="text" placeholder="Ingrese su Apellido" />
                        </Form.Group>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <Form.Control className="custom-input" type="email" placeholder="abc@ejemplo.com" />
                        </Form.Group>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control className="custom-input" type="password" placeholder="********" />
                        </Form.Group>
                        <Button className="custom-button mx-auto w-50 d-flex justify-content-center mt-5">Continuar</Button>
                    </Form>
                </div>
            </Container>
        </Background>
    );
}

export default UserRegister;