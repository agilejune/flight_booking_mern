'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
class SeatCostByDate extends sequelize_1.Model {
}
;
SeatCostByDate.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
    modelName: 'Seat_cost_by_dates',
});
exports.default = SeatCostByDate;
