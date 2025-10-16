import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Background from "../background/Background";

import "../style/Styles.css";

const ErrorNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <Background image="/images/ImageErrorNotFound.png">
      <Container className="d-flex flex-column justify-content-end align-items-start min-vh-100">
        <div className="text-start mb-5">
          <h1 className="titulo fw-bold mb-1 text-start">
            ¡Ups! Página no encontrada
          </h1>
          <div className="d-flex justify-content-center w-100">
            <Button className="custom-button-nf mx-auto w-25 d-flex justify-content-center"
            onClick={goBack}
            >INICIO</Button>
          </div>
        </div>
      </Container>
    </Background>
  );
};

export default ErrorNotFound;