import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";

const DeleteShipping = () => {
  return (
    <>
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <CustomCard title="ELIMINAR ENVÍO">
          <Form>
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Número de envío</Form.Label>
              <Form.Control
                className="custom-input"
                type="text"
                placeholder="Ej: 012345678"
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button type="submit" className="custom-button w-50">
                Eliminar
              </Button>
            </div>
          </Form>
        </CustomCard>
      </div>
    </>
  );
};

export default DeleteShipping;
