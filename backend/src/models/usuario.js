import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Usuario = sequelize.define("Usuario", {

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
nombre: {
    type: DataTypes.STRING,
    allowNull: false
},
apellido: {
    type: DataTypes.STRING,
    allowNull: false
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: { isEmail: true }
},
password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: { len: [8, 240] }
}}, {
  timestamps: false
});