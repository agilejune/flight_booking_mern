"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBHelper = void 0;
const index_1 = require("../index");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
let sequelize;
class DBHelper {
    initiateDBConnection() {
        sequelize = index_1.Init.sequilizeInit;
        sequelize
            .authenticate()
            .then(() => {
            console.log("DB connected");
        })
            .catch((err) => {
            console.log("Inside catch Sequilize Initialize:", sequelize);
            console.log("Unable to connect to the database:", err);
        });
    }
}
exports.DBHelper = DBHelper;
