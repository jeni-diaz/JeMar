import { Container, Form, Button } from 'react-bootstrap';

import Background from "../background/Background";

import '../style/GeneralStyles.css';

function ContactForm() {
    return (
        <>
            <Background image="/images/ImageContact.jpg">
                <Container className="d-flex align-items-center min-vh-100">
                    <div className="small-container d-flex flex-column justify-content-center">
                        <Form className="rounded-4 p-4">

                            <h2 className="titulo text-center mb-2 fw-bold">CONTACTO</h2>

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
                                <Form.Label>Consulta:</Form.Label>
                                <Form.Control className="custom-input" as="textarea" placeholder="Escribe tu consulta aquí..." />
                            </Form.Group>

                            <Button className="custom-button mx-auto w-50 d-flex justify-content-center mt-5">Continuar</Button>


                        </Form>
                    </div>
                </Container>
            </Background>
        </>
    );
}

export default ContactForm;