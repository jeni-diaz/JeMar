import { Router } from "express";
import { Shipment } from "../models/shipment.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

// GET /api/shipment
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo envíos" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { shipmentTypeId, origin, destination, status } = req.body;
    const userId = req.userId;

    const newShipment = await Shipment.create({
      userId,
      shipmentTypeId,
      origin,
      destination,
      status,
    });

    res.json(newShipment);
  } catch (error) {
    console.error("Error al crear envío:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando el envío con id... ${id}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando el envío con id... ${id}`);
});

export default router;
