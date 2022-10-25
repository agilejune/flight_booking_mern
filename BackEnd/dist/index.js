"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init = void 0;
require("dotenv").config();
const Sequelize = require("sequelize");
class Init {
}
exports.Init = Init;
Init.sequilizeInit = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "dialectOptions": {
        "requestTimeout": 10000,
    },
});
