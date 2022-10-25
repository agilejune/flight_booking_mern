"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const customer_1 = __importDefault(require("./customer"));
const schedule_1 = __importDefault(require("./schedule"));
const user_1 = __importDefault(require("./user"));
class BookList extends sequelize_1.Model {
}
BookList.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    outgo_schedule_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    return_schedule_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    customer_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    user_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    agent_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    total_cost: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    payment_type: {
        type: sequelize_1.DataTypes.ENUM('CARD', 'MOBILE', 'CASH'),
    },
    payment_status: {
        type: sequelize_1.DataTypes.ENUM('CONFIRMED', 'FAILED', 'REFUNDED'),
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('BOOKED', 'CANCELED'),
        defaultValue: 'BOOKED'
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
    modelName: 'Booklists',
});
BookList.belongsTo(schedule_1.default, {
    foreignKey: "outgo_schedule_id",
    as: "outgo_schedule"
});
BookList.belongsTo(schedule_1.default, {
    foreignKey: "return_schedule_id",
    as: "return_schedule"
});
BookList.belongsTo(customer_1.default, {
    foreignKey: "customer_id",
    as: "customer"
});
BookList.belongsTo(user_1.default, {
    foreignKey: "user_id",
    as: "user"
});
BookList.belongsTo(user_1.default, {
    foreignKey: "agent_id",
    as: "agent"
});
exports.default = BookList;
