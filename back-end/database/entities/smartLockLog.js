const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "SmartLockLog", // Logical name of the entity
  tableName: "smart_lock_logs", // The actual database table name
  columns: {
    id: {
      primary: true, // This column is the primary key
      type: "int", // Integer data type
      generated: true, // Auto-incrementing ID
    },
    guest_access_id: {
      type: "int",
      nullable: false, // This links to the GuestAccess entity (future many-to-one relation).
    },
    action: {
      type: "enum",
      enum: ["Guest Access Granted", "Guest Access Used", "Guest Access Expired"], // Tracks what action the guest access is used for
      nullable: false,
    },
    timestamp: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    }
  },
});