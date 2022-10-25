"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const seat_1 = __importDefault(require("./seat"));
const approve_list_1 = __importDefault(require("./approve_list"));
class ApproveSeat extends sequelize_1.Model {
}
ApproveSeat.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    approve_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
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
    price: {
        type: sequelize_1.DataTypes.FLOAT,
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
    modelName: 'Approve_seats',
});
ApproveSeat.belongsTo(approve_list_1.default, {
    foreignKey: "approve_id",
    as: "approve_list"
});
ApproveSeat.belongsTo(seat_1.default, {
    foreignKey: "seat_id",
    as: "seat"
});
exports.default = ApproveSeat;
