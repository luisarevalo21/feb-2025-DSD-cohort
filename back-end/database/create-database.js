// const { AppDataSource } = require("./data-source");
const { Client } = require("pg");

const createDatabase = async () => {
  const dbName = process.env.DB_NAME || "tenant_portal";
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "password",
    database: "postgres", // Connect to the default 'postgres' database first
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
    process.exit(1);
  }

  // Now initialize the AppDataSource (it will connect to the tenant_portal DB)
  // AppDataSource.initialize()
  //   .then(async () => {
  //     console.log("✅ Database connected. Running migrations...");
  //     await AppDataSource.synchronize();
  //     console.log("✅ Tables created.");
  //     process.exit();
  //   })
  //   .catch(error => {
  //     console.error("❌ Failed to initialize Data Source:", error);
  //     process.exit(1);
  //   });
};

createDatabase();
