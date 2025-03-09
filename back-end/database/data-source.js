require("dotenv").config();
const { DataSource } = require("typeorm");

const Admin = require("./entities/admin");
const Apartment = require("./entities/apartment");
const Complaint = require("./entities/complaint");
const Lease = require("./entities/lease");
const Tenant = require("./entities/tenant");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "tenant_portal",
  entities: [Admin, Apartment, Complaint, Lease, Tenant],
  synchronize: false,
  logging: ["error", "warn"],
  migrations: [__dirname + "/migration/*.js"],
  migrationsRun: true,
});

// ✅ DO NOT INITIALIZE IT HERE
// ✅ Just export it
module.exports = { AppDataSource };
