import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import { User, Shipment, ShipmentType } from "./models/index.js";

import shipmentsRoutes from "./routes/shipment.routes.js";
import userRoutes from "./routes/user.routes.js";
import shipmentTypeRoutes from "./routes/shipment_type.routes.js";
import authenticationRoutes from "./routes/authentication.routes.js";

const app = express();
app.use(express.json());

app.use(shipmentsRoutes);
app.use(userRoutes);
app.use(shipmentTypeRoutes);
app.use(authenticationRoutes);

try {
  await sequelize.sync({ force: true });
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error during initialization`);
}

// Test relationships
app.get("/test-relations", async (req, res) => {
  try {
    const user = await User.create({ firstName: "Martina", email: "martina@test.com", password: "1234" });
    const type = await ShipmentType.create({ name: "Express" });
    const shipment = await Shipment.create({
      user_id: user.id,
      shipment_type_id: type.id,
      origin: "Street 1",
      destination: "Street 2",
    });

    const userWithShipments = await User.findByPk(user.id, { include: Shipment });

    res.json({ user, shipment, userWithShipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
