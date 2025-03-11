const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Complaint",
  tableName: "complaints",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    apt_num: {
      type: "int",
      nullable: true,
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
    location: {
      type: "varchar",
      nullable: true,
    },
    timestamp: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    status: {
      type: "enum",
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
    admin_response: {
      type: "text",
      nullable: true,
    },
    priority: {
      type: "enum",
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
      nullable: true,
    },
  },
});
