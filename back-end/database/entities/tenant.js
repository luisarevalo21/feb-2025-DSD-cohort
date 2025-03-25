const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Tenant",
  tableName: "tenants",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
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
      type: "uuid",
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
