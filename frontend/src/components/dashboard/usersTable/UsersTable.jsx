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
    <Container className="small-container-table d-flex justify-content-center align-items-center flex-column w-100">
      {loading && <p>Cargando usuarios...</p>}

      {alertData.show && (
        <div className={`alert alert-${alertData.type}`} role="alert">
          {alertData.message}
        </div>
      )}

      {!loading && users.length > 0 && (
        <table className="table-container text-center">
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && users.length === 0 && !alertData.show && (
        <p className="title-card">No hay usuarios disponibles.</p>
      )}
    </Container>
  );
};

export default UsersTable;
