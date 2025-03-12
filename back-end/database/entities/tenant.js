const { EntitySchema } = require("typeorm");
const Lease = require("./lease");

module.exports = new EntitySchema({
  name: "Tenant",
  tableName: "tenants",
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
    date_of_birth: {
      type: "date",
    },
    lease_id: {
      type: "int",
      nullable: true,
    },
  },
});
