import { Router } from "express";
import { Shipment } from "../models/shipment.js";
import { User } from "../models/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ShipmentType } from "../models/shipment_type.js";
import { isSuperAdmin } from "../middlewares/verifyRol.js";

const router = Router();

router.get("/", verifyToken, isSuperAdmin, async (req, res) => {
  try {
    const shipments = await Shipment.findAll({
      include: [
        { model: ShipmentType, attributes: ["name", "description"] },
        { model: User, attributes: ["email"] },
      ],
    });
    res.json(shipments);
  } catch (error) {
    console.error("Error obteniendo envíos:", error);
    res.status(500).json({ error: "Error obteniendo envíos" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const idNumber = Number(req.params.id);
    const userId = req.user.id;
    const userRole = req.user.role;

    if (isNaN(idNumber) || idNumber <= 0) {
      return res
        .status(400)
        .json({ error: "El ID es incorrecto, no puede ser negativo o cero" });
    }

    const shipment = await Shipment.findByPk(idNumber, {
      include: [
        { model: ShipmentType, attributes: ["name", "description"] },
        { model: User, attributes: ["email"] },
      ],
    });

    if (!shipment) {
      return res.status(404).json({ error: "El envío no existe" });
    }

    if (userRole === "Usuario" && shipment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "No tenés permiso para ver este envío" });
    }

    if (shipment.status === "Cancelado") {
      if (userRole !== "SuperAdmin" && userRole !== "Empleado") {
        return res.status(403).json({ error: "El envío ya ha sido cancelado" });
      }
    }

    return res.json({
      id: shipment.id,
      status: shipment.status,
      type: shipment.ShipmentType?.name,
      description: shipment.ShipmentType?.description,
      destination: shipment.destination,
      origin: shipment.origin,
      price: shipment.price,
      userEmail: shipment.User?.email,
    });
  } catch (error) {
    console.error("Error consultando envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { shipmentTypeId, origin, destination } = req.body;
    const userId = req.user.id;

    console.log("Nuevo envío recibido:", req.body);
    console.log("Usuario ID:", userId);

    if (!shipmentTypeId || !origin || !destination) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const shipmentType = await ShipmentType.findByPk(shipmentTypeId);
    if (!shipmentType) {
      return res.status(400).json({ error: "Tipo de envío inválido" });
    }

    const priceMap = {
      Estandar: 25000,
      Express: 40000,
      Fragil: 60000,
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

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userRole = req.user.role;
    const userId = req.user.id;

    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ error: "El id es incorrecto, no puede ser negativo o cero" });
    }

    const shipment = await Shipment.findByPk(id);

    if (shipment.status === "Entregado") {
      return res
        .status(400)
        .json({
          error: "El envío no se puede cancelar porque ya fue entregado",
        });
    }

    if (!shipment) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    if (shipment.status === "Cancelado") {
      return res
        .status(400)
        .json({ error: "El envío no se puede modificar, ya fue cancelado" });
    }

    if (status === "Cancelado") {
      if (userRole !== "SuperAdmin" && shipment.userId !== userId) {
        return res.status(403).json({
          error:
            "Solo el SuperAdmin o el propietario pueden cancelar este envío.",
        });
      }

      if (userRole === "Empleado" && shipment.userId !== userId) {
        return res.status(403).json({
          error: "Solo el SuperAdmin puede cancelar envíos.",
        });
      }
    }

    if (userRole === "Usuario" && shipment.userId !== userId) {
      return res.status(403).json({
        error: "No tenés permiso para modificar este envío.",
      });
    }

    const possibleStatuses = [
      "Pendiente",
      "En camino",
      "Entregado",
      "Cancelado",
    ].filter((s) => s !== shipment.status);

    if (!status) {
      return res.json({
        message: `El envío ${id} está actualmente en estado '${shipment.status}'`,
        posiblesEstados: possibleStatuses,
      });
    }

    if (!possibleStatuses.includes(status)) {
      return res.status(400).json({
        error: `Estado inválido. Los estados posibles son: ${possibleStatuses.join(
          ", "
        )}`,
      });
    }

    shipment.status = status;
    await shipment.save();

    return res.json({
      message:
        status === "Cancelado"
          ? "El envío fue cancelado correctamente"
          : `El envío se actualizó correctamente a ${status}`,
      shipment,
    });
  } catch (error) {
    console.error("Error actualizando envío:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (isNaN(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "El id es incorrecto, no puede ser negativo o cero" });
  }

  const shipment = await Shipment.findByPk(id);
  if (!shipment) return res.status(404).json({ error: "Envío no encontrado" });

  if (user.role !== "SuperAdmin" && shipment.userId !== user.id) {
    return res
      .status(403)
      .json({ error: "No tenés permiso para cancelar este envío" });
  }

  if (shipment.status === "Cancelado") {
    return res.status(400).json({ error: "El envío ya está cancelado" });
  }

  if (shipment.status === "Entregado") {
    return res
      .status(400)
      .json({ error: "No podés cancelar un envío ya entregado" });
  }

  shipment.status = "Cancelado";
  shipment.isActive = false;
  await shipment.save();

  res.json({ message: "Envío cancelado correctamente" });
});

export default router;
