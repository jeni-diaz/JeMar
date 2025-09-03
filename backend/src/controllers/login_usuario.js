import { Usuario } from "../models/usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({
    where: {
      email,
    },
  });
  if (!usuario)
    return res.status(401).send({ message: "Usuario no existente" });

  const comparacion = await bcrypt.compare(password, usuario.password);

  if (!comparacion)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  const claveSecreta = "alagrandelepusecuca2025";
  
  const token = jwt.sign({ email }, claveSecreta, { expiresIn: "1h" });
  return res.json(token);
};
