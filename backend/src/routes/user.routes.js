import { Router } from "express";
import { User } from "../models/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "role", "isActive"],
    });
    res.json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

router.get("/verify/:email", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin") {
      return res
        .status(403)
        .json({ error: "Acceso denegado: solo SuperAdmin puede realizar esta acción" });
    }

    const { email } = req.params;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!user.isActive) {
      return res.status(400).json({ error: "El usuario ya fue eliminado previamente" });
    }

    res.json({ message: "Usuario encontrado y activo." });
  } catch (error) {
    console.error("Error verificando usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/changeRole", verifyToken, async (req, res) => {
  try {
    const { email, newRole } = req.body;

    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    user.role = newRole;
    await user.save();

    res.json({
      message: "Rol actualizado correctamente",
      user: {
        email: user.email,
        newRole: user.role,
      },
    });
  } catch (error) {
    console.error("Error cambiando rol:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/activate/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "El usuario no existe" });

    user.isActive = true;
    await user.save();

    res.json({ message: "Usuario activado correctamente" });
  } catch (error) {
    console.error("Error activando usuario:", error);
    res.status(500).json({ error: "Error al activar usuario" });
  }
});

router.delete("/", verifyToken, async (req, res) => {
  try {
    const { email } = req.body; 
    console.log("DELETE solicitado para:", email);

    if (req.user.role !== "SuperAdmin") {
       console.log("Acceso denegado, rol:", req.user.role);
      return res
        .status(403)
        .json({ error: "Acceso denegado: solo SuperAdmin puede realizar esta acción" });
    }

    const user = await User.findOne({ where: { email } });
     console.log("Usuario encontrado:", user ? user.email : "No existe");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!user.isActive) {
        console.log("Usuario ya estaba deshabilitado");
      return res.status(400).json({ error: "El usuario ya fue eliminado previamente" });
    }

    user.isActive = false;
    await user.save();
     console.log("Usuario actualizado correctamente");

    res.json({ message: "El usuario ${email} fue dado de baja." });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});


export default router;
