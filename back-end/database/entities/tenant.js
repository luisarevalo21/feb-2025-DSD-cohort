const { EntitySchema } = require("typeorm");

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
      nullable: true,
    },
    phone_number: {
      type: "varchar",
      nullable: true,
    },
    additional_information: {
      type: "varchar",
      nullable: true,
    },

    lease_id: {
      type: "int",
      nullable: true,
    },
  },
  relations: {
    lease: {
      target: "Lease",
      type: "one-to-one",
      joinColumn: {
        name: "lease_id",
      },
      inverseSide: "tenant",
    },

    complaints: {
      target: "Complaint",
      type: "one-to-many",
      inverseSide: "tenant",
    },
  },
});
