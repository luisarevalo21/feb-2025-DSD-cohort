const { Client } = require("pg");
const { DataSource } = require("typeorm");
const dbConfig = require("../ormconfig.js");

const createDatabase = async () => {
  const dbName = process.env.DB_NAME || "tenant_portal";
  const client = new Client({
    ...dbConfig,
    database: "postgres",
  });

  try {
    await client.connect();
    console.log("✅ Connected to Postgres. Checking if database exists...");

    // Check if the database exists
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}';`);

    if (result.rowCount === 0) {
      console.log(`🛠 Database '${dbName}' does not exist. Creating it...`);
      await client.query(`CREATE DATABASE "${dbName}";`);
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
