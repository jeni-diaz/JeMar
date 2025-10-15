import { Router } from "express";
import { Shipment } from "../models/shipment.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/shipment", async (req, res) => {
  const shipment = await  Shipment.findAll();
  res.json(shipment);
});

router.post("/shipment", verifyToken, async (req, res) => {
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

router.put("/shipment/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando el envio con id... ${id}`);
});

router.delete("/shipment/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando el envio con id... ${id}`);
});

export default router;
