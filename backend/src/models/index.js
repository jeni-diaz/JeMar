import { User } from "./user.js";
import { Shipment } from "./shipment.js";
import { ShipmentType } from "./shipment_type.js";

User.hasMany(Shipment, { foreignKey: "user_id", onDelete: "CASCADE" });
Shipment.belongsTo(User, { foreignKey: "user_id" });

ShipmentType.hasMany(Shipment, { foreignKey: "shipment_type_id", onDelete: "CASCADE" });
Shipment.belongsTo(ShipmentType, { foreignKey: "shipment_type_id" });

export { User, Shipment, ShipmentType };

