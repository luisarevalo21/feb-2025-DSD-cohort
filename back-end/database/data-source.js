require("dotenv").config();
const { DataSource } = require("typeorm");
const dbConfig = require("../ormconfig.js");

const AppDataSource = new DataSource(dbConfig);

AppDataSource.initialize()
  .then(() => console.log("✅ Data Source has been initialized!"))
  .catch((err) =>
    console.error("❌ Error during Data Source initialization:", err)
  );

module.exports = AppDataSource;
