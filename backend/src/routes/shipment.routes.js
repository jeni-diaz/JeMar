import { Router } from "express";
import { Shipment } from "../models/shipment.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ShipmentType } from "../models/shipment_type.js";
import { isEmpleado } from "../middlewares/verifyRol.js";


const router = Router();


router.get("/", verifyToken, isEmpleado, async (req, res) => {
  try {
    const shipments = await Shipment.findAll({
      include: [{ model: ShipmentType, attributes: ["name", "description"] }],
    });
    res.json(shipments);
  } catch (error) {
    console.error("💥 Error obteniendo envíos:", error);
    res.status(500).json({ error: "Error obteniendo envíos" });
  }
});

// ✅ Consultar UN envío (cualquiera logueado)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await Shipment.findByPk(id, {
      include: [{ model: ShipmentType, attributes: ["name", "description"] }],
    });

    if (!shipment) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    return res.json({
      id: shipment.id,
      status: shipment.status,
      type: shipment.ShipmentType?.name,
      destination: shipment.destination,
      origin: shipment.origin,
      price: shipment.price,
    });
  } catch (error) {
    console.error("💥 Error consultando envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.post("/", verifyToken, async (req, res) => {
  try {
    const { shipmentTypeId, origin, destination } = req.body;
    const userId = req.user.id;

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
      estandar: 25000,
      express: 40000,
      fragil: 60000,
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
    console.error("Error al crear envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:id", verifyToken, isEmpleado, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "El campo 'status' es obligatorio" });
    }

    const shipment = await Shipment.findByPk(id);
    if (!shipment) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    shipment.status = status;
    await shipment.save();

    return res.json({
      message: `Estado del envío #${id} actualizado correctamente a '${status}'`,
      shipment,
    });
  } catch (error) {
    console.error("Error actualizando envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await Shipment.findByPk(id);

    if (!shipment) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }
    if (
      shipment.userId !== req.user.id &&
      req.user.role !== "superAdmin" &&
      req.user.role !== "empleado"
    ) {
      return res.status(403).json({ error: "No tienes permiso para eliminar este envío" });
    }

    await shipment.destroy();
    return res.json({ message: `Envío ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error eliminando envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});



export default router;
