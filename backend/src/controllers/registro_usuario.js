import { Usuario } from "../models/usuario.js";
import bcrypt from "bcryptjs";

export const registroUsuario = async (req, res) => {
    const {nombre, apellido, email, password} = req.body;

    const usuario = await Usuario.findOne({
        where: {
            email
        }
    });
if (usuario)
    return res.status(400).send({ message: "Usuario existente" });

const saltRounds = 10;

const salt = await bcrypt.genSalt(saltRounds);

const hashedPassword = await bcrypt.hash(password, salt);

const nuevoUsuario = await Usuario.create({
    nombre, 
    apellido, 
    email, 
    password: hashedPassword,
});

res.json(nuevoUsuario.id);
}

