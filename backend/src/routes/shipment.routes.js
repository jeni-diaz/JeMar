import { Router } from "express";
import { Shipment } from "../models/shipment.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ShipmentType } from "../models/shipment_type.js";

const router = Router();


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
    const { shipmentTypeId, origin, destination } = req.body;
    const userId = req.userId;

    console.log("✅ Nuevo envío recibido:", req.body);
    console.log("🧍 Usuario ID:", userId);

    if (!shipmentTypeId || !origin || !destination) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Obtener el tipo de envío (por nombre)
    const shipmentType = await ShipmentType.findByPk(shipmentTypeId);
    if (!shipmentType) {
      return res.status(400).json({ error: "Tipo de envío inválido" });
    }

    // Definir precios fijos según tipo
    const priceMap = {
      estandar: 2500,
      express: 4000,
      fragil: 6000,
    };

    const price = priceMap[shipmentType.name] || 0;

    const newShipment = await Shipment.create({
      userId,
      shipmentTypeId,
      origin,
      destination,
      price,
    });

    return res.status(201).json({
      message: "Envío creado correctamente",
      shipment: newShipment,
    });

  } catch (error) {
    console.error("💥 Error al crear envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
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
