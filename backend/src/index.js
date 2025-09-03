import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import { Usuario, Envio, Tipo_envio } from "./models/index.js";

import enviosRoutes from "./routes/envios.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import tipo_envioRoutes from "./routes/tipo_envio.routes.js";
import autenticacion from "./routes/autenticacion.routes.js"

const app = express();
app.use(express.json());

app.use(enviosRoutes);
app.use(usuarioRoutes);
app.use(tipo_envioRoutes);
app.use(autenticacion);

try {
  await sequelize.sync({ force: true });
  app.listen(PORT);
  console.log(`server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}

app.get("/test-relaciones", async (req, res) => {
  try {
    const usuario = await Usuario.create({ nombre: "Martina", email: "martina@test.com", password: "1234" });
    const tipo = await Tipo_envio.create({ nombre: "Express" });
    const envio = await Envio.create({ usuario_id: usuario.id, tipo_envio_id: tipo.id, origen: "Calle 1", destino: "Calle 2" });

    const usuarioConEnvios = await Usuario.findByPk(usuario.id, { include: Envio });

    res.json({ usuario, envio, usuarioConEnvios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
