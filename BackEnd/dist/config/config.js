"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
require('dotenv').config();
class Config {
}
exports.Config = Config;
Config.PORT = process.env.PORT || 3000;
Config.NODE_ENV = process.env.NODE_ENV || "dev";
Config.AUTH_ENCRYPTION_SALT = process.env.AUTH_ENCRYPTION_SALT;
Config.SECRET_FOR_JWT = process.env.SECRET_FOR_JWT;
Config.DB_USERNAME = process.env.DB_USERNAME;
Config.DB_PASSWORD = process.env.DB_PASSWORD;
Config.DB_NAME = process.env.DB_NAME;
Config.DB_HOST = process.env.DB_HOST;
Config.DB_DIALECT = process.env.DB_DIALECT;
Config.VAT_PERCENTAGE = 5;
Config.DB_SOCKET = process.env.DB_SOCKET;
