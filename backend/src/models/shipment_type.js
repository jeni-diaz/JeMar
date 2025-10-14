import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ShipmentType = sequelize.define("ShipmentType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.ENUM("standard", "express", "fragile"),
    defaultValue: "standard",
  },
}, {
  timestamps: false,
});

