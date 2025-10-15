import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import shipmentRoutes from "./routes/shipment.routes.js";
import userRoutes from "./routes/user.routes.js";
import shipmentTypeRoutes from "./routes/shipment_type.routes.js";
import authenticationRoutes from "./routes/authentication.routes.js";

const app = express();
app.use(express.json());

app.use(shipmentRoutes);
app.use(userRoutes);
app.use(shipmentTypeRoutes);
app.use(authenticationRoutes);

try {
  await sequelize.sync();
  app.listen(PORT);
  console.log(`Servidor escuchando en el puerto ${PORT}`);
} catch (error) {
  console.log(`Hubo un error durante la inicialización`);
}
