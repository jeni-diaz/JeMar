import { Container, Form, Button } from 'react-bootstrap';

import Background from "../background/Background";

import '../style/GeneralStyles.css';

function ShippingQuote() {
    return (
        <>
            <Background image="/images/ImageQuote.jpg">
                <Container className="d-flex align-items-center min-vh-100">

                    <div className="small-container d-flex flex-column justify-content-center">

                        <Form className="rounded-4 p-4">

                            <h2 className="titulo text-center mb-2 fw-bold">COTIZAR ENVÍO</h2>

                            <Form.Group className="imput-group mb-3 w-bold">
                                <Form.Label>Tipo de envío:</Form.Label>
                                <Form.Select className="custom-input">
                                    <option value="">-</option>
                                    <option value="standard">Envío estándar</option>
                                    <option value="express">Envío exprés</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="imput-group mb-3 w-bold">
                                <Form.Label>Origen:</Form.Label>
                                <Form.Control className="custom-input" type="text" placeholder="Ej: Rosario" />
                            </Form.Group>

                            <Form.Group className="imput-group mb-3 w-bold">
                                <Form.Label>Destino:</Form.Label>
                                <Form.Control className="custom-input" type="text" placeholder="Ej: Buenos Aires" />
                            </Form.Group>

                            <Button className="custom-button mx-auto w-50 d-flex justify-content-center mt-5">Cotizar</Button>

                        </Form>

                    </div>

                </Container>

            </Background>
        </>
    );
}

export default ShippingQuote;