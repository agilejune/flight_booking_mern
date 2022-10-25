"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const seat_1 = __importDefault(require("./seat"));
const book_list_1 = __importDefault(require("./book_list"));
class BookedSeat extends sequelize_1.Model {
}
BookedSeat.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    booklist_id: {
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
    modelName: 'Booked_seats',
});
BookedSeat.belongsTo(book_list_1.default, {
    foreignKey: "booklist_id",
    as: "booklists"
});
BookedSeat.belongsTo(seat_1.default, {
    foreignKey: "seat_id",
    as: "seats"
});
exports.default = BookedSeat;
