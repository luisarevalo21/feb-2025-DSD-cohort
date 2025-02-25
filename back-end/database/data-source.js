require("dotenv").config(); // Load environment variables
const { DataSource } = require("typeorm"); // TypeORM's database manager
const Admin = require("./entities/admin") // Import the Admin entity
const Apartment = require("./entities/apartment") // Import the Apartment entity
const Complaint = require("./entities/complaint") // Import the Complaint entity
const GuestAccess = require("./entities/guessAccess") // Import the GuestAccess entity
const LeaseAgreement = require("./entities/leaseAgreement") // Import the LeaseAgreement entity
const SmartLock = require("./entities/smartLock") // Import the SmartLock entity
const SmartLockLog = require("./entities/SmartLockLogs") // Import the SmartLockLog entity
const Tenant = require("./entities/tenant"); // Import the Tenant entity

const AppDataSource = new DataSource({
  type: "postgres", // Specifies we are using PostgreSQL
  host: process.env.DB_HOST || "localhost", // Database host (from .env or default)
  port: parseInt(process.env.DB_PORT) || 5432, // PostgreSQL runs on port 5432
  username: process.env.DB_USER || "postgres", // Database username
  password: process.env.DB_PASS || "password", // Database password
  database: process.env.DB_NAME || "tenant_portal", // Database name
  entities: [Admin, Apartment, Complaint, GuestAccess, LeaseAgreement, SmartLock, SmartLockLog, Tenant], // Load our entities (tables)
  synchronize: true, // Auto-creates tables based on entities (use only in dev! switch to false for prod)
  logging: true, // Logs SQL queries (useful for debugging)
});

AppDataSource.initialize()
  .then(() => console.log("Database connected ✅"))
  .catch((error) => console.error("Database connection error:", error));

module.exports = { AppDataSource };