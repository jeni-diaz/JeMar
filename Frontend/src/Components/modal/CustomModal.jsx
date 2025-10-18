import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, body, buttons }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      <Modal.Footer>
        {buttons.map((btn, i) => (
          <Button
            key={i}
            variant={btn.variant || "primary"}
            onClick={btn.onClick || onHide}
          >
            {btn.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;