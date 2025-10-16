import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser)
    return res.status(401).json({ message: "Usuario no existente" });

  
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch)
    return res.status(401).json({ message: "Email y/o contraseña incorrecta" });

  const secretKey = "alagrandelepusecuca2025";

  const token = jwt.sign(
  { id: existingUser.id, email: existingUser.email, role: existingUser.role },
  secretKey,
  { expiresIn: "1h" }
);

  return res.json({ token });
};
