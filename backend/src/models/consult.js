import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Consult = sequelize.define(
    "Consult",
    {
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

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

        consult: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);
