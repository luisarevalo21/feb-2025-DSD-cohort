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
    apartment_number: {
      type: "text",
      unique: true,
    },
    square_footage: {
      type: "int",
    },
    bedrooms: {
      type: "int",
    },
    bathrooms: {
      type: "int",
    },
    floor: {
      type: "int",
    },
    notes: {
      type: "text",
      nullable: true,
    },
  },
});
