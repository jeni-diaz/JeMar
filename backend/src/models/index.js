import { User } from "./user.js";
import { Shipment } from "./shipment.js";
import { ShipmentType } from "./shipment_type.js";

User.hasMany(Shipment, { foreignKey: "userId", onDelete: "CASCADE" });
Shipment.belongsTo(User, { foreignKey: "userId" });

ShipmentType.hasMany(Shipment, { foreignKey: "shipmentTypeId", onDelete: "CASCADE" });
Shipment.belongsTo(ShipmentType, { foreignKey: "shipmentTypeId" });

export { User, Shipment, ShipmentType };
