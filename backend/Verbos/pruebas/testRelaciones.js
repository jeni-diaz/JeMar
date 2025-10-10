import { sequelize } from "../backend/src/db.js";
import { Usuario, Envio, Tipo_envio } from "../backend/src/models/index.js";

async function testEnvio() {
  try {
    // 🔹 Crear un usuario y un tipo de envío
    const usuario = await Usuario.create({ nombre: "Juan", apellido: "Perez", email: "juan@test.com", password: "12345678" });
    const tipo = await Tipo_envio.create({ nombre: "Express" });

    // 🔹 Crear un envío relacionado con ambos
    const envio = await Envio.create({
      usuario_id: usuario.id,
      tipo_envio_id: tipo.id,
      origen: "Rosario",
      destino: "Bs As",
      fecha_envio: new Date("2025-09-02"),
      estado: "pendiente"
    });

    console.log("Envio creado:");
    console.log(envio.toJSON());

    // 🔹 Traer el envío con sus relaciones
    const envioConRelaciones = await Envio.findByPk(envio.id, { include: [Usuario, Tipo_envio] });
    console.log("Envio con usuario y tipo de envío:");
    console.log(envioConRelaciones.toJSON());

  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

testEnvio();
