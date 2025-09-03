import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Tipo_envio = sequelize.define("Tipo_de_envio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre:{
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type : DataTypes.ENUM("estandar", "express", "fragil"),
    defaultValue: "estandar",
 }}, {
  timestamps: false
});

