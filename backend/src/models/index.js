import { Usuario } from "./usuario.js";
import { Envio } from "./envios.js";
import { Tipo_envio } from "./tipo_envio.js";

Usuario.hasMany(Envio, { foreignKey: "usuario_id", onDelete: "CASCADE" });
Envio.belongsTo(Usuario, { foreignKey: "usuario_id" });

Tipo_envio.hasMany(Envio, { foreignKey: "tipo_envio_id", onDelete: "CASCADE" });
Envio.belongsTo(Tipo_envio, { foreignKey: "tipo_envio_id" });

export { Usuario, Envio, Tipo_envio };
