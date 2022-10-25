'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const seat_1 = __importDefault(require("./seat"));
class SeatCostByLeftSeat extends sequelize_1.Model {
}
;
SeatCostByLeftSeat.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    seat_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    greater_than: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    less_equal_than: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    percentage: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('ENABLE', 'DISABLE'),
        defaultValue: 'ENABLE'
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
    modelName: 'Seat_cost_by_leftseats',
});
SeatCostByLeftSeat.belongsTo(seat_1.default, {
    foreignKey: "seat_id",
    as: "seats"
});
exports.default = SeatCostByLeftSeat;
