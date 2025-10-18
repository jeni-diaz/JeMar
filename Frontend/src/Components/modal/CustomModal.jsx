import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, body, buttons }) => {
  return (
    <Modal className="container-modal" show={show} onHide={onHide} centered>
      <div>
        <Modal.Header closeButton className="titulo">
          <Modal.Title className="titulo">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="sub-titulo">{body}</Modal.Body>

        <Modal.Footer>
          {buttons.map((btn, i) => (
            <Button
              key={i}
              onClick={btn.onClick || onHide}
              className={btn.className || "custom-button"}
            >
              {btn.label}
            </Button>
          ))}
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CustomModal;
