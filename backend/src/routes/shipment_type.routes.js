import { Router } from "express";
import { ShipmentType } from "../models/shipment_type.js";

const router = Router();

router.get("/shipment_type/:id", async (req, res) => {
  const { id } = req.params;
  const shipmentType = await ShipmentType.findByPk(id);
  res.json(shipmentType);
});

router.get("/shipment_type", async (req, res) => {
  try {
    const types = await ShipmentType.findAll();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo tipos de envío" });
  }
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
  res.send(`Actualizando tipo de envío con id... ${id}`);
});

router.delete("/shipment_type/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando el tipo de envío con id... ${id}`);
});

export default router;