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
        fs.readdirSync(__dirname)
            .filter((file) => {
            return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
        })
            .forEach((file) => {
            const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });
        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
    }
}
exports.DBHelper = DBHelper;
