import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "../db.js";

import "../models/envios.js"
import "../models/usuario.js"

import enviosRoutes from "../routes/envios.routes.js";
import usuarioRoutes from "../routes/usuario.routes.js"
import tipo_envioRoutes from "../routes/tipo_envio.routes.js"


const app = express();
app.use(express.json());

app.use(enviosRoutes);
app.use(usuarioRoutes);
app.use(tipo_envioRoutes);

try {
  await sequelize.sync({force: true});
  app.listen(PORT);
  console.log(`server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
