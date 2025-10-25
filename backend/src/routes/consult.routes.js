import { Router } from "express";
import { Consult } from "../models/consult.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", verifyToken, async (req, res) => {
    try {
        const consult = await Consult.findAll({ atributes: ["createdAt", "id", "firstName", "lastName", "email", "consult"] });
        res.json(consult);
    } catch (error) {
        console.error("Error obteniendo consulta: ", error);
        res.status(500).json({ error: "Error obteniendo consulta" })
    }
});

router.post("/", async (req, res) => {
    try {
        const { createdAt, id, firstName, lastName, email, consult } = req.body;

        const newConsult = await Consult.create({
            createdAt,
            firstName,
            lastName,
            email,
            consult,
        });

        res.json(newConsult);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;