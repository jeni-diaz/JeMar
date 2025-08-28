import { Router } from "express";

const router = Router();

router.get("/envios/:id", (req, res) => {
    const { id } = req.params;
res.send(`Obteniendo el envio con id... ${id}`);
});

router.post("/envios", (req, res) => {
res.send("Creando el envio")
});

router.put("/envios/:id", (req, res) => {
    const { id } = req.params;
res.send(`Actualizando el envio con id... ${id}`);
});

router.delete("/envios/:id", (req, res) => {
    const { id } = req.params;
res.send(`Borrando el envio con id... ${id}`);
});

export default router;
