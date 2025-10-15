import { Router } from "express";
import { User } from "../models/user.js";

const router = Router();

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.json(user);
});

router.post("/user", async (req, res) => {
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

router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando usuario con id... ${id}`);
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando el usuario con id... ${id}`);
});

export default router;
