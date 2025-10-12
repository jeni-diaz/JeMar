import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Shipment = sequelize.define(
  "Shipment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipment_date: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "on the way", "delivered", "canceled"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: false,
  }
);
