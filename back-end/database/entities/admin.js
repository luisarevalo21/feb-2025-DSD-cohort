const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Admin",
  tableName: "admins",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "varchar",
    },
    last_name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
    },
  },
});
