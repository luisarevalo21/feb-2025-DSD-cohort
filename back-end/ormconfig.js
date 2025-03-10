// This file is used to configure the database connection for TypeORM.
const Admin = require("./database/entities/admin");
const Lease = require("./database/entities/lease");
const Apartment = require("./database/entities/apartment");
const Tenant = require("./database/entities/tenant");

module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "tenant_portal",
  synchronize: false,
  logging: false,
  entities: [Admin, Lease, Apartment, Tenant],
  migrations: ["./database/migrations/**/*.js"],
  experimentalDecorators: true, // <---
  emitDecoratorMetadata: true, // <---
};
