import express from "express";

import { PORT } from "./config.js";
import { sequelize } from "../db.js";

import "../models/envios.js"

import enviosRoutes from "../routes/envios.routes.js";


const app = express();

try {
  app.use(express.json());
  app.listen(PORT);
  app.use(enviosRoutes);

  await sequelize.sync();

  console.log(`server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
