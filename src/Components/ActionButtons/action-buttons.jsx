import React from 'react';
import { Button } from 'react-bootstrap';
import './action-buttons.css';

const ActionButtons = () => {
  return (
    <div className="bottom-buttons">
      <Button variant="none" className="btn-custom">Cotizar</Button>
      <Button variant="none" className="btn-custom">Realizar</Button>
      <Button variant="none" className="btn-custom">Rastrear</Button>
    </div>
  );
};

export default ActionButtons;
