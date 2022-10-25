'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const schedule_1 = __importDefault(require("./schedule"));
const seat_1 = __importDefault(require("./seat"));
class Ticket extends sequelize_1.Model {
}
;
Ticket.init({
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
    modelName: 'Tickets',
});
seat_1.default.belongsTo(Ticket, {
    as: "seat_id",
});
schedule_1.default.belongsTo(Ticket, {
    as: "schedule_id"
});
exports.default = Ticket;
