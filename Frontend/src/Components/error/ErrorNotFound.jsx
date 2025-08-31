import { Button, Row, Container, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Background from "../background/Background";

import '../style/GeneralStyles.css';

const ErrorNotFound = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/")
    }

    return (
        <Background image="/images/ImageMistake.jpg">
            <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <Container className="custom-box w-100">
                <Row className="justify-content-space-between text-center">
                    <Col xs={6} md={6} className="shipping-select text-center">
                        <h1 className="m-0">¡Ups! Página no encontrada</h1>
                        <Button variant="" className="custom-button mx-auto w-25 d-flex justify-content-center mt-5" onClick={goBack}>Regresar</Button>
                    </Col>
                </Row>
            </Container>
             </Container>
        </Background>
    );
};

export default ErrorNotFound
