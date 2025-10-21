import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({ show: false, message: "", type: "" });

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAlertData({
        show: true,
        message: "Debes iniciar sesión para ver los usuarios.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al obtener usuarios.");
      }

      setUsers(data);
      setAlertData({ show: false, message: "", type: "" });
    } catch (error) {
      console.error("Error:", error);
      setAlertData({
        show: true,
        message: error.message || "Error al consultar los usuarios.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="small-container-table d-flex justify-content-start w-100">
      {loading && <p>Cargando usuarios...</p>}

      {alertData.show && (
        <div className={`alert alert-${alertData.type}`} role="alert">
          {alertData.message}
        </div>
      )}

      {!loading && users.length > 0 && (
        <table className="table-container text-center caption-top">
          <caption className="text-center">Lista de Usuarios</caption>
          <thead>
            <tr className="p-1">
              <th className="p-1">ID Usuario</th>
              <th className="p-1">Nombre</th>
              <th className="p-1">Apellido</th>
              <th className="p-1">Email</th>
              <th className="p-1">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-1">{user.id}</td>
                <td className="p-1">{user.firstName}</td>
                <td className="p-1">{user.lastName}</td>
                <td className="p-1">{user.email}</td>
                <td className="p-1">{user.role}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-center"> -- </tfoot>
        </table>
      )}

      {!loading && users.length === 0 && !alertData.show && (
        <p className="title-card">No hay usuarios disponibles.</p>
      )}
    </Container>
  );
};

export default UsersTable;
