// Update with your config settings.

require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    database: "csbc1030",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
