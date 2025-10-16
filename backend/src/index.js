import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import cors from "cors";

import shipmentRoutes from "./routes/shipment.routes.js";
import userRoutes from "./routes/user.routes.js";
import shipmentTypeRoutes from "./routes/shipment_type.routes.js";
import authenticationRoutes from "./routes/authentication.routes.js";
import { ShipmentType } from "./models/shipment_type.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/shipment", shipmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shipment_type", shipmentTypeRoutes);
app.use("/api/auth", authenticationRoutes);

try {
  await sequelize.sync();

  const existingTypes = await ShipmentType.count();
  if (existingTypes === 0) {
    await ShipmentType.bulkCreate([
      { name: "estandar", description: "Envío estándar" },
      { name: "express", description: "Envío rápido" },
      { name: "fragil", description: "Manejar con cuidado" },
    ]);
    console.log("✅ Tipos de envío iniciales creados");
  } else {
    console.log("⚙️ Tipos de envío ya existentes, no se crean duplicados");
  }

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
} catch (error) {
  console.error("Hubo un error durante la inicialización:", error);
}
