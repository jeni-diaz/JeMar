import { Container, Row, Col, Button } from "react-bootstrap";

const CustomCard = ({
  title,
  children,
  buttonText,
  buttonAction,
  buttonType = "button",
}) => {
  return (
    <Container className="d-flex justify-content-center mb-5">
      <div
        className="small-container d-flex flex-column"
   
      >
        <div className="p-3">
          <h2 className="titulo fw-bold text-center mb-0">{title}</h2>
        </div>

        <div className="ocultar-scroll flex-grow-1 overflow-auto p-3">
          {children}
        </div>

        {buttonText && (
          <div className="p-3 text-center">
            <Button
              className="custom-button w-50"
              type={buttonType}
              onClick={buttonAction}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CustomCard;
