const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Apartment",
  tableName: "apartments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
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
