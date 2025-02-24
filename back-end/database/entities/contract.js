const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Contract", // Logical name of the entity
  tableName: "contracts", // The actual database table name
  columns: {
    id: {
        primary: true, // This column is the primary key
        type: "int", // Integer data type
        generated: true, // Auto-incrementing ID
    },
    tenant_id: {
        type: "int", // Integer to reference tenant
        nullable: false, // Must have a tenant associated with the contract
    },
    tenant_sig: {
        type: "text", // Text field for tenant signature
        nullable: true, // Needed to complete contract but empty at first
    },
    landlord_id: {
        type: "int", // Integer to reference landlord
        nullable: false, // Every contract should be associated with a/the landlord
    },
    landlord_sig: {
        type: "text",
        nullable: true, // Contracts may not require landlord approval
    },
    apartment_id: {
        type: "int", // Integer to reference apartment
        nullable: false, // Must have a tenant associated with the contract
    },
    details: {
        type: "text", // Text field to store the general details of the contract
        nullable: false, // Needed for all details for landlord and tenant
    },
    timestamp: {
        type: "timestamp", // When the contract was made
        default: () => "CURRENT_TIMESTAMP", // Default to current time when created
    },
    lease_start_date: {
        type: "date",
        nullable: false, // Needs starting date of lease
    },
    lease_end_date: {
        type: "date",
        nullable: false, // Needs ending date for renewal or end of lease
    },
    renewal_time: {
        type: "enum",
        enum: ["Monthly", "Bi-monthly", "Yearly"], // Used for after initial lease end date, to indicate new end date if tenant renews
        nullable: false,
    },
    status: {
        type: "enum",
        enum: ["Pending", "Signed", "Renewed"], // Different statuses for contract status
        default: "Pending", // Default to "Pending" when the contract is first made
    },
    expiration_date: {
        type: "date",
        nullable: true, // Optional but useful for tracking unsigned contracts
    },
    notes: {
        type: "text",
        nullable: true, // If landlord wishes to add extra details
    },
    last_updated: {
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    },
  },
});