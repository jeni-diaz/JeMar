import  { Router } from "express";
import { Usuario } from "../models/usuario.js";


const router = Router();

router.get("/usuario/:id", async (req, res) => {
const { id } = req.params;
const usuario = await Usuario.findByPk(id);
res.json(usuario);
});

router.post("/usuario", async (req, res) => {
    const {
        nombre, 
        email, 
        password,
    } = req.body;

    const new_usuario = await Usuario.create({
         nombre, 
        email, 
        password,
    });
    res.json(new_usuario);
});

router.put("/usuario/:id", (req, res) => {
const { id } = req.params;
res.send(`Actualizando ususario con id... ${id}`);
});

router.delete("/usuario/:id", (req, res) => {
    const {id} = req.params;
    res.send(`Borrando el usuario con id... ${id}`);
});

export default router;