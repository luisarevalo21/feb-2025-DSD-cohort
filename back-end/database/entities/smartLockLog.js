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
    smart_lock_id: {
        type: "int", // Id of the smart lock being accessed
        nullable: false // Required to track logs for specific smart locks
    },
    action: {
        type: "enum",
        enum: ["Unlocked", "Locked", "Access Attempt", "Access Denied"], // Various actions recorded in the log
        nullable: false, // Required to describe the action taken
    },
    timestamp: {
        type: "timestamp", // When an access was made
        default: () => "CURRENT_TIMESTAMP", // Default to current time when created
    },
  },
});