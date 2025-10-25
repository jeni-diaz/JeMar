import { Router } from "express";
import { Consult } from "../models/consult.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", verifyToken, async (req, res) => {
    try {
        const consults = await Consult.findAll({
            attributes: ["createdAt", "id", "firstName", "lastName", "email", "consult"]
        });
        res.json(consults);
    } catch (error) {
        console.error("Error creando consulta:", error);
        res.status(500).json({ error: error.message || "Error creando consulta" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, consult } = req.body;

        if (!firstName || !lastName || !email || !consult) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const newConsult = await Consult.create({
            firstName,
            lastName,
            email,
            consult,
        });

        res.status(201).json(newConsult);
    } catch (error) {
        console.error("Error creando consulta:", error);
        res.status(500).json({ error: error.consult });
    }
});

export default router;