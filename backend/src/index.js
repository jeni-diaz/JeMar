import express from "express";
import { PORT } from "./config.js";
import enviosRoutes from "../routes/envios.routes.js";
import { sequelize } from "../db.js";
import "../models/envios.js"

const app = express();

try {
  app.listen(PORT);
  app.use(enviosRoutes);

  await sequelize.sync();

  console.log(`server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
