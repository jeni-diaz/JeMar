import React from 'react';
import { Button } from 'react-bootstrap';

import './action-buttons.css';


const ActionButtons = () => {
  return (

    <div className="col position-fixed start-50 translate-middle-x d-flex justify-content-center">
  <Button className="Button-acction">Cotizar</Button>
  <Button className="Button-acction">Realizar</Button>
  <Button className="Button-acction">Rastrear</Button>
</div>
  );
};

export default ActionButtons;
