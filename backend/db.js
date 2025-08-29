import { Sequelize } from "sequelize";
// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",       // tu usuario
//   password: "",       // tu contraseña
//   database: "enviosjemar"
// });

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'envios.db'
});

