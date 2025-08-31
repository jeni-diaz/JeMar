import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/GeneralStyles.css';

const BackArrow = () => {
  const navigate = useNavigate();

  const handleBackArrow = () => {
    navigate(-1);
  };

  return (
    <i
      className="bi bi-arrow-left-square-fill back-icon"
      onClick={handleBackArrow}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleBackArrow()}
      aria-label="Volver atrás"
    ></i>
  );
};

export default BackArrow;