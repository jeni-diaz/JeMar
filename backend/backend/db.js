import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",       // tu usuario
  password: "",       // tu contraseña
  database: "enviosjemar"
});

export default pool;
