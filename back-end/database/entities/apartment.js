const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Apartment",
  tableName: "apartments",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
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
    features: {
      type: "text",
      array: true,
      nullable: true,
    },
    notes: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    lease: {
      type: "one-to-many",
      target: "Lease",
      inverseSide: "apartment",
    },
    accessControl: {
      type: "one-to-one",
      target: "AccessControl",
      inverseSide: "apartment",
    },
  },
});
