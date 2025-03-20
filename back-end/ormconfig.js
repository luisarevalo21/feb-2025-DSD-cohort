// This file is used to configure the database connection for TypeORM.
const Admin = require("./database/entities/admin");
const Lease = require("./database/entities/lease");
const Apartment = require("./database/entities/apartment");
const Tenant = require("./database/entities/tenant");
const Complaint = require("./database/entities/complaint");

const { DB_USER, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;

module.exports = {
  type: "postgres",
  user: DB_USER,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Admin, Lease, Apartment, Tenant, Complaint],
  migrations: ["./database/migrations/**/*.js"],
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
};
