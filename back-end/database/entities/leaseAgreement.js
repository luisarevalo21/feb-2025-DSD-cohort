const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "LeaseAgreement", // Renamed for clarity
  tableName: "lease_agreements",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    apt_num: {
      type: "int",
      nullable: false, // References the apartment this lease is for (future relation)
    },
    tenant_id: {
      type: "int",
      nullable: true, // References the tenant assigned to this lease (future relation)
    },
    landlord_id: {
      type: "int",
      nullable: false, // References the landlord or admin managing this lease
    },
    lease_start_date: {
      type: "date",
      nullable: false, // The official start date of the lease
    },
    lease_end_date: {
      type: "date",
      nullable: false, // The official end date of the lease
    },
    renewal_term: {
      type: "enum",
      enum: ["Monthly", "Bi-monthly", "Yearly"],
      nullable: false, // Defines how the lease is renewed after the initial term
    },
    status: {
      type: "enum",
      enum: ["Pending", "Signed", "Renewed"],
      default: "Draft", // Tracks lease progress from creation to renewal or expiration
    },
    notes: {
      type: "text",
      nullable: true, // Extra notes the landlord may add
    },
  },
});