"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const schedule_1 = __importDefault(require("./schedule"));
const seat_1 = __importDefault(require("./seat"));
class BookingSeat extends sequelize_1.Model {
}
BookingSeat.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    schedule_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    seat_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    seat_number: {
        type: sequelize_1.DataTypes.STRING,
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
    modelName: 'Booking_seats',
});
schedule_1.default.belongsTo(BookingSeat, {
    as: "schedule_id",
});
seat_1.default.belongsTo(BookingSeat, {
    as: "seat_id",
});
exports.default = BookingSeat;
