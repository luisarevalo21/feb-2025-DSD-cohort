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
    },
    lease_id: {
      type: "int",
      nullable: true,
    },
    tenant_details_id: {
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
    tenant_details: {
      target: "TenantDetails",
      type: "one-to-one",
      joinColumn: {
        name: "tenant_details_id",
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
