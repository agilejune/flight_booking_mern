const { Config } = require('../dist/config/config');
console.log(Config);
module.exports = {
  local: {
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    host: Config.DB_HOST,
    port: 3306,
    dialect: "mysql",
  },
  development: {
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    host: Config.DB_HOST,
    port: 3306,
    dialect: "mysql",
  },
  test: {
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    host: Config.DB_HOST,
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    host: Config.DB_HOST,
    port: 3306,
    dialect: "mysql",
  },
};
