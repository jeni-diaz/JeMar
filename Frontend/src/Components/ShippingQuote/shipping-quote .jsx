import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import './shipping-quote.css';

function ShippingQuote() {
    return (
        <div className="image-background">
            <Container className="d-flex align-items-center min-vh-100">
                <div className="small-container">
                    <Form className='rounded-4 p-5'>
                        <h2 className="text-center mb-4 fw-bold">COTIZAR ENVÍO</h2>

                        <Form.Group className="imput-group mb-3 w-bold">
                            <Form.Label>Tipo de envío:</Form.Label>
                            <Form.Select className="custom-input">
                                <option value="">Seleccione el tipo de envío</option>
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

                        <Button className="custom-button mx-auto w-50 d-flex justify-content-center mt-5">Continuar</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default ShippingQuote;