import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [8, 240] },
    },

    role: {
      type: DataTypes.ENUM("SuperAdmin", "Empleado", "Usuario"),
      allowNull: false,
      defaultValue: "Usuario",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);
