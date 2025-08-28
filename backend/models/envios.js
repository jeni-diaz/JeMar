import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


export const Envio = sequelize.define("Envio", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    tipo_envio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    origen: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    destino: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    fecha_envio: {
    type: DataTypes.DATE,
    allowNull: false,
    },
    estado: {
  type: DataTypes.ENUM('pendiente', 'en camino', 'entregado', 'cancelado'),
  defaultValue: 'pendiente'
},
creado_en: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
},
});