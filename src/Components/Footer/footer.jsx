import React from 'react';

const Footer = () => {
  return (
    <footer
      className="fixed-bottom"
      style={{
        backgroundColor: '#000',
        boxShadow: '0 -10px 15px rgba(176, 127, 17, 0.8)',
        zIndex: 1030,
        height: '40px',
        lineHeight: '40px',
        padding: '0 0',
      }}
    >
      <div className="container-fluid d-flex justify-content-center">
        <span style={{ color: '#B07F11', fontSize: '0.8rem' }}>
          © 2025 Envíos JeMar - Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
