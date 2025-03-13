const { EntitySchema } = require("typeorm");
const Apartment = require("./apartment");

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
    apartment_id: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    apartment: {
      target: "Apartment",
      type: "many-to-one",
      joinColumn: {
        name: "id",
      },
      inverseSide: "leases",
    },

    tenant: {
      target: "Tenant",
      type: "one-to-one",
      joinColumn: {
        name: "tenant_id",
      },
      inverseSide: "lease",
    },
  },
});
