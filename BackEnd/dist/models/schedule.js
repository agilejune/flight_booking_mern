"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const airport_1 = __importDefault(require("../models/airport"));
const aircraft_1 = __importDefault(require("./aircraft"));
class Schedule extends sequelize_1.Model {
}
Schedule.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    depart_airport_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    arrive_airport_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    aircraft_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    depart_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    arrive_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    timestamps: true,
    sequelize: index_1.Init.sequilizeInit,
    modelName: 'Schedules',
});
Schedule.belongsTo(airport_1.default, {
    foreignKey: "depart_airport_id",
    as: "depart_airport"
});
Schedule.belongsTo(airport_1.default, {
    foreignKey: "arrive_airport_id",
    as: "arrive_airport"
});
Schedule.belongsTo(aircraft_1.default, {
    foreignKey: "aircraft_id",
    as: "aircraft"
});
exports.default = Schedule;
