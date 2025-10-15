import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  
    const newUser = await User.create({
      nombre: firstName,
      apellido: lastName,
      email,
      password: hashedPassword,
    });

    const secretKey = "alagrandelepusecuca2025";
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: newUser.id,
        firstName: newUser.nombre,
        email: newUser.email,
      },
      token,
    });

  } catch (error) {
    console.error("Error en registerUser:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

