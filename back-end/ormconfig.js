const Admin = require("./database/entities/admin");
const Lease = require("./database/entities/lease");
const Apartment = require("./database/entities/apartment");
const Tenant = require("./database/entities/tenant");
const Complaint = require("./database/entities/complaint");

const {
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  NODE_ENV,
} = process.env;

module.exports = {
  name: NODE_ENV === "production" ? undefined : "default",
  type: "postgres",
  user: DB_USER,
  host: DB_HOST || "localhost",
  port: Number(DB_PORT || 5432),
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "password",
  database: DB_DATABASE || "tenant_portal",
  synchronize: false,
  logging: false,
  entities: [Admin, Lease, Apartment, Tenant, Complaint],
  migrations: ["./database/migrations/**/*.js"],
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
};
