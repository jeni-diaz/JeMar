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
    <>
    <h1 className="title-card text-center">Lista de Usuarios</h1>
      {loading && <p>Cargando usuarios...</p>}

      {alertData.show && (
        <div className={`alert alert-${alertData.type}`} role="alert">
          {alertData.message}
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="table-responsive ocultar-scroll text-center" style={{ maxHeight: '400px' }}>
          <table className="table-container text-center caption-top">
            <thead>
            <tr className="p-1">
              <th className="p-1">ID Usuario</th>
              <th className="p-1">Nombre</th>
              <th className="p-1">Apellido</th>
              <th className="p-1">Email</th>
              <th className="p-1">Rol</th>
              <th className="p-1">Eliminar</th>
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
                <td className="p-1"><i class="cross-icon bi bi-x-square-fill"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {!loading && users.length === 0 && !alertData.show && (
        <p className="title-card">No hay usuarios disponibles.</p>
      )}
    
    </>
  );
};

export default UsersTable;
