import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, body, button }) => {
  return (
    <Modal className="container-modal" show={show} onHide={onHide} centered>
      <div>
        <Modal.Header closeButton className="titulo">
          <Modal.Title className="titulo">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="sub-titulo">{body}</Modal.Body>

        <Modal.Footer>
          <Button
            onClick={button?.onClick || onHide}
            className={button?.className || "custom-button"}
          >
            {button?.label || "Cerrar"}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CustomModal;

