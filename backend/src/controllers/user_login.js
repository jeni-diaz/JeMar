import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user)
    return res.status(401).send({ message: "Usuario no existente" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).send({ message: "Correo electrónico y/o contraseña incorrectos" });

  const secretKey = "alagrandelepusecuca2025";
  
  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
  return res.json(token);
};
