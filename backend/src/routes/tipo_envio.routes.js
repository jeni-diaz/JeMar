import { Router } from "express";
import { Tipo_envio } from "../models/tipo_envio.js";

const router = Router();

router.get("/tipo_envio/:id", async (req, res) => {
  const { id } = req.params;
  const tipo_envio = await Tipo_envio.findByPk(id);
  res.json(tipo_envio);
});

router.post("/tipo_envio", async (req, res) => {
  const { nombre, descripcion, } = req.body;

const new_tipo_envio = await Tipo_envio.create({
    nombre, descripcion,
});
res.json(new_tipo_envio);
});

router.put("/tipo_envio/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Actualizando tipo de envio con id... ${id}`);
});

router.delete("/tipo_envio/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Borrando el tipo de dato con id... ${id}`)
});

export default router;