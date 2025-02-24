const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Apartment", // Logical name of the entity
  tableName: "apartments", // The actual database table name
  columns: {
    id: {
      primary: true, // This column is the primary key
      type: "int", // Integer data type
      generated: true, // Auto-incrementing ID
    },
    tenant_id: {
        type: "int", // id of tenant occupying the room
        nullable: true, // Empty until tenant signs contract for apartment
    },
    apt_num: {
      type: "int", // Apartment number
      nullable: false, // Must be assigned to indicate room number
    },
    bedrooms: {
        type: "int", // Number of rooms in apartment
        nullable: false, // Must have a tenant associated with the contract
    },
    bathrooms: {
        type: "int", // Number of bathrooms
        nullable: false, // Required
    },
    sq_ft: {
        type: "int", // Square footage (use decimal if needed)
        nullable: false, // Required
    },
    description: { // detailed description of the apartment
      type: "text",
      nullable: false, // Needed for tenants to look into the apartment features
    },     
    status: {
      type: "enum",
      enum: ["Available", "Occupied"], // Status of apartment
      default: "Available", // Default to "Available"
    },
    building: {
        type: "varchar",
        nullable: true, // Only needed if there are multiple buildings
    }, 
  },
});