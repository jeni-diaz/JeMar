import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const ShipmentsTable = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({ show: false, message: "", type: "" });

  const fetchShipments = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAlertData({
        show: true,
        message: "Debes iniciar sesión para ver los envíos.",
        type: "error",
      });
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
        throw new Error(data.error || "Error al obtener envíos.");
      }

      setShipments(data);
      setAlertData({ show: false, message: "", type: "" });
    } catch (error) {
      console.error("Error:", error);
      setAlertData({
        show: true,
        message: error.message || "Error al consultar los envíos.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <>
       <Container className="small-container-table d-flex justify-content-start w-100">
        {loading && <p>Cargando envíos...</p>}

        {alertData.show && (
          <div className={`alert alert-${alertData.type}`} role="alert">
            {alertData.message}
          </div>
        )}

        {!loading && shipments.length > 0 && (
           <table className="table-container text-center caption-top">
          <caption className="text-center">Lista de Envíos</caption>
            <thead>
              <tr>
                <th className="p-1">Usuario</th>
                <th className="p-1">Número de envío</th>
                <th className="p-1">Estado</th>
                <th className="p-1">Tipo</th>
                <th className="p-1">Origen</th>
                <th className="p-1">Destino</th>
                <th className="p-1">Precio</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((envio) => (
                <tr className="p-3" key={envio.id}>
                  <td className="p-1">{envio.User?.email || "Desconocido"}</td>
                  <td className="p-1">{envio.id}</td>
                  <td className="p-1">{envio.status}</td>
                  <td className="p-1">{envio.type}</td>
                  <td className="p-1">{envio.origin}</td>
                  <td className="p-1">{envio.destination}</td>
                  <td className="p-1">${envio.price.toLocaleString("es-AR")}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-center"> -- </tfoot>
          </table>
        )}

        {!loading && shipments.length === 0 && !alertData.show && (
          <p className="title-card">No hay envíos disponibles.</p>
        )}
      </Container>
    </>
  );
};

export default ShipmentsTable;
