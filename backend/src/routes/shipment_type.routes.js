import { Router } from "express";
import { ShipmentType } from "../models/shipment_type.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const types = await ShipmentType.findAll();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo tipos de envío" });
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const newShipmentType = await ShipmentType.create({ name, description });
  res.json(newShipmentType);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando tipo de envío con id... ${id}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando el tipo de envío con id... ${id}`);
});

export default router;
