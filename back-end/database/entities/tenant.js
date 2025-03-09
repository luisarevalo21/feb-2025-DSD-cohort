const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Tenant", // Logical name of the entity
  tableName: "tenants", // The actual database table name
  columns: {
    id: {
      primary: true, // This column is the primary key
      type: "int", // Integer data type
      generated: true, // Auto-incrementing ID
    },
    first_name: {
      type: "varchar",
    },
    last_name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true, // Ensures emails are not duplicated
    },
    date_of_birth: {
      type: "date",
    },
  },
});
