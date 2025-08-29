import { Button, Container, Row } from 'react-bootstrap';

import './login.css';

const Login = () => {
  return (
    <div className="image-background">

      <Container className="d-flex align-items-center min-vh-100">

        <Row className="small-container rounded-4 p-5">

          <h2 className="text-center mb-4 fw-bold">INICIAR SESIÓN</h2>

          <form className="login align-items-center">
            <div className="mb-3 fw-bold">
              <label className="form-label">Usuario:</label>
              <input type="email" className="form-control" placeholder="Correo electrónico" />
            </div>

            <div className="mb-4 fw-bold">
              <label className="form-label">Clave:</label>
              <input type="password" className="form-control" placeholder="********" />
            </div>

            <button type="submit" className="btn btn-dark w-50 border border-warning fw-bold">INGRESAR</button>
          </form>

          <p className="mt-3 text-center small">
            <a href="#" className="text-warning text-decoration-none">Olvide mi contraseña</a> |
            <a href="#" className="text-warning text-decoration-none ms-1">Registrarme</a>
          </p>

        </Row>


      </Container>

    </div>
  );
};

export default Login;