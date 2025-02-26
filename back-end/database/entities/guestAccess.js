const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "GuestAccess",
  tableName: "guest_access",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    smart_lock_id: {
      type: "int",
      nullable: false, // This links to the SmartLock being accessed (future many-to-one relation).
    },
    tenant_id: {
      type: "int",
      nullable: false, // This links to the tenant who created the guest key (future many-to-one relation).
    },
    access_code: {
      type: "varchar",
      nullable: false, 
    },
    expires_at: {
      type: "timestamp", // Assigned an expiration date
      nullable: false, 
    },
    logs: {
      type: "json", // Mock placeholder
      nullable: true,
      comment: "This should be a one-to-many relation with SmartLockLog in the future."
    }
  }
});