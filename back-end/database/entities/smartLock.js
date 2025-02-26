const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "SmartLock", // Logical name of the entity
  tableName: "smart_locks", // The actual database table name
  columns: {
    id: {
      primary: true, // This column is the primary key
      type: "int", // Integer data type
      generated: true, // Auto-incrementing ID
    },
    tenant_id: {
        type: "int", // id of tenant that has control
        nullable: true, // Empty until assigned to a tenant
    },    
    status: {
      type: "enum",
      enum: ["Locked", "Unlocked"], // Status of smart lock
      default: "Locked", // Default to "Locked"
    },
    guest_keys: {
      type: "json", // Mock placeholder for future relationship
      nullable: true, // This should be a one-to-many relation with GuestAccess in the future.
    }
  },
});