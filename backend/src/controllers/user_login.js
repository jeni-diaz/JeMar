import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { validateEmail, validatePassword } from "../helpers/validations.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    return res
      .status(400)
      .json({ message: "Email o contraseña con formato inválido" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({ message: "Usuario no existente" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email, role: existingUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en userLogin:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
