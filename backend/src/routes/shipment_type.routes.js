import { Router } from "express";
import { ShipmentType } from "../models/shipment_type.js";

const router = Router();

router.get("/shipment_type/:id", async (req, res) => {
  const { id } = req.params;
  const shipmentType = await ShipmentType.findByPk(id);
  res.json(shipmentType);
});

router.post("/shipment_type", async (req, res) => {
  const { name, description } = req.body;

  const newShipmentType = await ShipmentType.create({
    name,
    description,
  });

  res.json(newShipmentType);
});

router.put("/shipment_type/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Updating shipment type with id... ${id}`);
});

router.delete("/shipment_type/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Deleting shipment type with id... ${id}`);
});

export default router;
