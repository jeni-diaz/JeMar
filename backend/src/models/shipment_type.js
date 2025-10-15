import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ShipmentType = sequelize.define(
  "ShipmentType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM("estandar", "express", "fragil"),
      defaultValue: "estandar",
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
