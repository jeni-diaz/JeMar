import { Router } from "express";
import { Envio } from "../models/envios.js";

const router = Router();

router.get("/envios", async (req, res) => {
  const envio = await Envio.findAll();
  res.json(envio);
});

router.post("/envios", async (req, res) => {
  const {
    usuario_id,
    tipo_envio_id,
    origen,
    destino,
    fecha_envio,
    estado,
    creado_en,
  } = req.body;

  const new_envio = await Envio.create({
    usuario_id,
    tipo_envio_id,
    origen,
    destino,
    fecha_envio,
    estado,
    creado_en
});
  res.json(new_envio);

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
