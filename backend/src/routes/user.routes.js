import { Router } from "express";
import { User } from "../models/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.json(user);
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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando usuario con id... ${id}`);
});

router.put("/changeRole", verifyToken, async (req, res) => {
  try {
    const { email, newRole } = req.body;

    if (req.user.role !== "superAdmin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    user.role = newRole;
    await user.save();

    res.json({ message: `Rol actualizado a ${newRole}` });
  } catch (error) {
    console.error("Error cambiando rol:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando el usuario con id... ${id}`);
});

export default router;
