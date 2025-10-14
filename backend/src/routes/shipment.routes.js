import { Router } from "express";
import { Shipment } from "../models/shipment.js";

const router = Router();

router.get("/shipment", async (req, res) => {
  const shipments = await Shipment.findAll();
  res.json(shipments);
});

router.post("/shipment", async (req, res) => {
  const {
    user_id,
    shipment_type_id,
    origin,
    destination,
    shipment_date,
    status,
  } = req.body;

  const newShipment = await Shipment.create({
    user_id,
    shipment_type_id,
    origin,
    destination,
    shipment_date,
    status,
  });

  res.json(newShipment);
});

router.put("/shipment/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Updating shipment with id... ${id}`);
});

router.delete("/shipment/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Deleting shipment with id... ${id}`);
});

export default router;
