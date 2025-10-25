import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const ShipmentsTable = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchShipments = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para ver los envíos.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/shipment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al obtener los envíos.");
        return;
      }

      setShipments(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al consultar los envíos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <>
      <h1 className="title-card text-center">Lista de Envíos</h1>

      {loading && <p>Cargando envíos...</p>}

      {!loading && shipments.length > 0 && (
        <Container className="back-table ocultar-scroll text-center p-3">
          <table className="table-container">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Número de envío</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((envio) => (
                <tr key={envio.id}>
                  <td>{envio.User?.email}</td>
                  <td>{envio.id}</td>
                  <td>{envio.status}</td>
                  <td>{envio.ShipmentType?.name}</td>
                  <td>{envio.origin}</td>
                  <td>{envio.destination}</td>
                  <td>${envio.price.toLocaleString("es-AR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      )}

      {!loading && shipments.length === 0 && (
        <h2 className="text-center">No hay envíos disponibles.</h2>
      )}
    </>
  );
};

export default ShipmentsTable;
