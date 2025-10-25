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
      type: DataTypes.ENUM("Estandar", "Express", "Fragil"),
      defaultValue: "Estandar",
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
