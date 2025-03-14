const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TenantDetails",
  tableName: "tenant_details",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    tenant_id: {
      type: "int",
      nullable: false,
    },
    phone_number: {
      type: "varchar",
    },

    profile_photo: {
      type: "varchar",
    },
    additional_information: {
      type: "varchar",
    },
    tenant_id: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    tenant: {
      target: "Tenant",
      type: "one-to-one",
      joinColumn: {
        name: "tenant_id",
      },
      inverseSide: "tenant_details",
    },
  },
});
