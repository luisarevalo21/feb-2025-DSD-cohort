// This file is used to configure the database connection for TypeORM.
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
  entities: ["./database/entities/*.js"],
  migrations: ["./database/migrations/**/*.js"],
  experimentalDecorators: true, // <---
  emitDecoratorMetadata: true, // <---
};
