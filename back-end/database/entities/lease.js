const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Lease",
  tableName: "leases",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    lease_start_date: {
      type: "date",
      nullable: false,
    },
    lease_end_date: {
      type: "date",
      nullable: false,
    },
    monthly_rent_in_dollars: {
      type: "int",
      nullable: false,
    },
    notes: {
      type: "text",
      nullable: true,
    },
    signed_at: {
      type: "date",
      nullable: true,
    },
    signature: {
      type: "text",
      nullable: true,
    },
    apartment_id: {
      type: "int",
      nullable: false,
    },
    tenant_id: {
      type: "int",
      nullable: false,
      unique: true,
    },
  },
  relations: {
    apartment: {
      target: "Apartment",
      type: "many-to-one",
      joinColumn: {
        name: "apartment_id",
      },
      inverseSide: "lease",
    },

    tenant: {
      target: "Tenant",
      type: "one-to-one",
      //foreign key used to reference the pirmary key of the target entity
      joinColumn: {
        name: "tenant_id",
      },
      inverseSide: "lease",
    },
  },
});
