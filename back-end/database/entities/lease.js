const { EntitySchema } = require("typeorm");
const apartment = require("./apartment");

module.exports = new EntitySchema({
  name: "Leases", // Renamed for clarity
  tableName: "leases",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    lease_start_date: {
      type: "date",
      nullable: false, // The official start date of the lease
    },
    lease_end_date: {
      type: "date",
      nullable: false, // The official end date of the lease
    },
    monthly_rent_in_dollars: {
      type: "int",
      nullable: false, // The monthly rent amount
    },
    notes: {
      type: "text",
      nullable: true, // Extra notes the landlord may add
    },
    apartment_id: {
      type: "int",
      nullable: false, // The apartment this lease is for
    },
  },
});
