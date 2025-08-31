import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Background from "../background/Background";

import '../style/GeneralStyles.css';

function ShippingTrack() {
    return (
        <Background image="/images/ImageTrack.jpg">
            <Container className="d-flex align-items-center min-vh-100">
                <div className="small-container d-flex flex-column justify-content-center">
                    <Form className="rounded-4 p-5 mx-auto">
                        <h2 className="text-center mb-2 fw-bold">RASTREAR ENVÍO</h2>

                        <Form.Group className="imput-group mb-3 w-bold ">
                            <Form.Label>Número de seguimiento:</Form.Label>
                            <Form.Control className="custom-input" type="number" step="1" min="0" placeholder="Ej: 123456"/>
                        </Form.Group>

                        <Button className="custom-button mx-auto w-50 d-flex justify-content-center">Rastrear</Button>

                    </Form>
                </div>
            </Container>
        </Background>
    );
}

export default ShippingTrack;