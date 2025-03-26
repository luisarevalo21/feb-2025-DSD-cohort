const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Complaint",
  tableName: "complaints",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    date_submitted: {
      type: "date",
      nullable: false,
    },
    complaint_type: {
      type: "enum",
      enum: ["Noise", "Disturbance", "Emergency", "Maintenance", "Other"],
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    status: {
      type: "enum",
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
    tenant_id: {
      type: "uuid",
      nullable: false,
    },
  },
  relations: {
    tenant: {
      target: "Tenant",
      type: "many-to-one",
      joinColumn: {
        name: "tenant_id",
      },
      inverseSide: "complaints",
    },
  },
});
