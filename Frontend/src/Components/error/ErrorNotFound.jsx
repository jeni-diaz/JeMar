import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Background from "../background/Background";

import '../style/Styles.css';

const ErrorNotFound = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/")
    }

    return (
        <>
            <Background image="/images/ImageErrorNotFound.png">
                <Container className="d-flex flex-column justify-content-end align-items-start min-vh-100 p-5">
                    <h1 className="titulo fw-bold">¡Ups! Página no encontrada</h1>
                </Container>
            </Background>
        </>
    );
};

export default ErrorNotFound
