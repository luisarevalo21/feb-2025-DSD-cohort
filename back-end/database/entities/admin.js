const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Admin", // Logical name of the entity
  tableName: "admins", // The actual database table name
  columns: {
    id: {
      primary: true, // This column is the primary key
      type: "int", // Integer data type
      generated: true, // Auto-incrementing ID
    },
    name: {
      type: "varchar",
    },
    password: {
      type: "varchar",
      length: 255, // Ensure enough space for hashed passwords in the future
    },
    email: {
      type: "varchar",
      unique: true, // Ensures emails are not duplicated
    },
  },
});