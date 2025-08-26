import React from 'react';

const Header = () => {
  return (
    <nav
  className="navbar navbar-expand-lg fixed-top"
  style={{
    backgroundColor: '#000',
    backgroundImage:
      'linear-gradient(to bottom, #000000, #000000), linear-gradient(to bottom, #B07F11, transparent)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 15px 12px 0 rgba(176, 127, 17, 0.8)',
    zIndex: 1030,
  }}
>
      <div className="container-fluid">

        <div className="d-flex align-items-center">
          <img src="./public/icono.svg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span className="navbar-brand mb-0 h1" style={{ color: '#B07F11', fontSize: '2rem' }}>Envíos JeMar</span>
        </div>

        <div className="d-flex ms-auto">
          <button className="btn me-2" style={{ color: '#B07F11', border: 'none', backgroundColor: 'transparent', fontSize: '1.55rem'  }}>Contacto</button>
          <button className="btn me-2" style={{ color: '#B07F11', border: 'none', backgroundColor: 'transparent', fontSize: '1.5rem' }}>Iniciar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
