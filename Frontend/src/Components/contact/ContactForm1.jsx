import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import Background from "../background/Background";

import '../style/GeneralStyles.css';

function ContactForm() {
    return (
        <>
            <Background image="/images/ImageContact.jpg">
                <Container className="d-flex align-items-center min-vh-100">
                    <Row className="w-100">

                        <Col md={6} className="d-flex justify-content-center">
                            <div className="small-container d-flex flex-column justify-content-center">
                                <Form className="rounded-4 p-4">

                                    <h2 className="titulo text-center mb-2 fw-bold">HACE TU CONSULTA</h2>

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

                                    <Button className="custom-button mx-auto w-50 d-flex justify-content-center mt-5">Enviar</Button>


                                </Form>
                            </div>
                        </Col>

                        <Col md={6} className="d-flex justify-content-center">
                            <div className="small-container d-flex flex-column justify-content-center">
                                <div className="rounded-4 p-4">

                                    <h2 className="titulo text-center mb-2 fw-bold">CONTACTO</h2>

                                    <label>
                                        Dirección:
                                        Dorrego 453, Rosario, Santa Fe.
                                        <br />
                                        Telefono: +54 123 4567890
                                        <br />
                                        Celular: +54 098 7654321
                                        <br />
                                        Correo Electrónico: contacto@jemar.com.ar
                                    </label>
                                    <div className="mt-3" style={{ width: "100%", height: "300px" }}>
                                        <iframe
                                            title="Ubicación en Google Maps"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.4713068456353!2d-60.64983522442693!3d-32.94941347280553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539c8a48ad55%3A0xc780bd32769b8a12!2sDorrego%20453%2C%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1693685189056!5m2!1ses!2sar"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Background >
        </>
    );
}

export default ContactForm;