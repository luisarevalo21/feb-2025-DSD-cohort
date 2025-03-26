const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "AccessControl",
  tableName: "access_control",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    primary_lock_code: {
      type: "int",
      nullable: false,
    },
    temp_code: {
      type: "int",
      nullable: true,
    },
    expires_at: {
      type: "timestamp",
      nullable: true,
    },
    apartment_id: {
      type: "uuid",
      nullable: false,
    },
  },
  relations: {
    apartment: {
      target: "Apartment",
      type: "one-to-one",
      joinColumn: {
        name: "apartment_id",
      },
      inverseSide: "accessControl",
    },
  },
});
