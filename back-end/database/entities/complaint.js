const { EntitySchema } = require("typeorm");
const tenant = require("./tenant");

module.exports = new EntitySchema({
  name: "Complaint",
  tableName: "complaints",
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
  },
});
