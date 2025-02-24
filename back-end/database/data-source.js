require("dotenv").config(); // Load environment variables
const { DataSource } = require("typeorm"); // TypeORM's database manager
const Apartment = require("./entities/apartment") // Import the Apartment entity
const Complaint = require("./entities/complaint") // Import the Complaint entity
const Contract = require("./entities/contract") // Import the Contract entity
const SmartLock = require("./entities/smartLock") // Import the SmartLock entity
const SmartLockLog = require("./entities/SmartLockLogs") // Import the SmartLockLog entity
const User = require("./entities/user"); // Import the User entity

const AppDataSource = new DataSource({
  type: "postgres", // Specifies we are using PostgreSQL
  host: process.env.DB_HOST || "localhost", // Database host (from .env or default)
  port: parseInt(process.env.DB_PORT) || 5432, // PostgreSQL runs on port 5432
  username: process.env.DB_USER || "postgres", // Database username
  password: process.env.DB_PASS || "password", // Database password
  database: process.env.DB_NAME || "tenant_portal", // Database name
  entities: [Apartment, Complaint, Contract, SmartLock, SmartLockLog, User], // Load our entities (tables)
  synchronize: true, // Auto-creates tables based on entities (use only in dev! switch to false for prod)
  logging: true, // Logs SQL queries (useful for debugging)
});

AppDataSource.initialize()
  .then(() => console.log("Database connected ✅"))
  .catch((error) => console.error("Database connection error:", error));

module.exports = { AppDataSource };