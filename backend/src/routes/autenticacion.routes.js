import { Router } from "express";
import { registroUsuario } from "../controllers/registro_usuario.js";
import { loginUsuario } from "../controllers/login_usuario.js";

const router = Router();

router.post("/registro", registroUsuario);

router.post("/login", loginUsuario);

export default router;