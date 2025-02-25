const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Complaint", // Logical name of the entity
  tableName: "complaints", // The actual database table name
  columns: {
    id: {
      primary: true, // This column is the primary key
      type: "int", // Integer data type
      generated: true, // Auto-incrementing ID
    },
    apt_num: {
      type: "int", // Integer for apartment number
      nullable: true, // Optional, but useful for the landlord to better address the complaint
    },
    complaint_type: {
        type: "enum", // Enum for complaint types
        enum: ["Noise", "Disturbance", "Emergency", "Maintenance", "Other"], // Allowed complaint types
      nullable: false, // Can't be empty
    },
    description: {
      type: "text", // Text field to store detailes about the complaint
      nullable: true, // Optional, for more details about complaint
    },
    location: {
      type: "varchar", // The location where the disturbance occurred
      nullable: true, // Optional, but useful for details
    },
    timestamp: {
      type: "timestamp", // When the complaint was filed
      default: () => "CURRENT_TIMESTAMP", // Default to current time when created
    },
    status: {
      type: "enum",
      enum: ["New", "In Progress", "Resolved"], // Different statuses for tracking
      default: "New", // Default to "New" when the complaint is first filed
    },
    admin_response: {
      type: "text", // Admin/landlord's response (optional)
      nullable: true, // Optional, could be added after reviewing the complaint
    },
    priority: {
        type: "enum", // Enum for priority levels
        enum: ["Low", "Medium", "High", "Urgent"], // Allowed priority levels
        default: "Medium", // Default priority
      nullable: true, // Optional but useful for prioritization
    },
  },
});