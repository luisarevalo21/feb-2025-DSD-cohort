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
        nullable: true, // Empty until tenant signs contract for apartment
    },
    access_code: {
      type: "varchar", // Currently varchar
      nullable: true, // Optional, used to grant guest access
    },    
    status: {
      type: "enum",
      enum: ["Locked", "Unlocked"], // Status of smart lock
      default: "Locked", // Default to "Locked"
    },
    log_entries: {
        type: "varchar", // Varchar for now, but needs to be changed to a relationship with a table of logs
        nullable: true, // Empty at first as no changes to smart lock until a tenant is assigned
    }, 
  },
});