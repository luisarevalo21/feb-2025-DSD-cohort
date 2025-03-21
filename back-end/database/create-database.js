require("dotenv").config();
const { Client } = require("pg");
const { DataSource } = require("typeorm");
const dbConfig = require("../ormconfig.js");

const createDatabase = async () => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("✅ Connected to Postgres. Checking if database exists...");

    // Check if the database exists
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbConfig.database}';`);

    if (result.rowCount === 0) {
      console.log(`🛠 Database '${dbConfig.database}' does not exist. Creating it...`);
      await client.query(`CREATE DATABASE "${dbConfig.database}";`);
      console.log("✅ Database created.");
    } else {
      console.log("✅ Database already exists. Skipping creation.");
    }

    await client.end();
  } catch (error) {
    console.error("❌ Failed to create the database:", error);
    await client.end();
    return;
  }

  const AppDataSource = new DataSource(dbConfig);
  try {
    await AppDataSource.initialize();
    console.log("✅ Data Source has been initialized!");

    await AppDataSource.synchronize();
    console.log("✅ Tables created.");

    await AppDataSource.destroy();
    console.log("✅ Data Source has been destroyed!");
  } catch (err) {
    console.error("❌ Error during Data Source initialization:", err);
    await AppDataSource.destroy();
  }
};

createDatabase();
