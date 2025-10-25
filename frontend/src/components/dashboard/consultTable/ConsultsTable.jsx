import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const ConsultsTable = () => {
  const [consults, setConsults] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchConsults = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para ver las consultas.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/consult", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al obtener las consultas.");
        return;
      }

      setConsults(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al consultar las consultas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsults();
  }, []);

  return (
    <>
      <h1 className="title-card text-center">Lista de Consultas</h1>

      {loading && <p>Cargando consultas...</p>}

      {!loading && consults.length > 0 && (
        <Container className="back-table ocultar-scroll text-center p-3">
          <table className="table-container">
            <thead>
              <tr>
                <th>Número de consulta</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>Consulta</th>
              </tr>
            </thead>
            <tbody>
              {consults.map((consult) => (
                <tr key={consult.id}> 
                  <td>{consult.id}</td>
                  <td>{consult.firstName}</td> 
                  <td>{consult.lastName}</td>
                  <td>{consult.email}</td>
                  <td>{consult.consult}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      )}

      {!loading && consults.length === 0 && (
        <h2 className="text-center">No hay consultas disponibles.</h2>
      )}
    </>
  );
};

export default ConsultsTable;
