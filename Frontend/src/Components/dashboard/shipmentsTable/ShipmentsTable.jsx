import { useState, useEffect } from "react";

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
      <div className="d-flex justify-content-center align-items-center flex-column w-100">
        {loading && <p>Cargando envíos...</p>}

        {alertData.show && (
          <div className={`alert alert-${alertData.type}`} role="alert">
            {alertData.message}
          </div>
        )}

        {!loading && shipments.length > 0 && (
          <table className="table-container text-center">
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
                  <td></td>
                  <td>{envio.id}</td>
                  <td>{envio.status}</td>
                  <td>{envio.type}</td>
                  <td>{envio.origin}</td>
                  <td>{envio.destination}</td>
                  <td>${envio.price.toLocaleString("es-AR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && shipments.length === 0 && !alertData.show && (
          <p>No hay envíos disponibles.</p>
        )}
      </div>
    </>
  );
};

export default ShipmentsTable;
