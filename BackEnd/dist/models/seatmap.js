'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const seat_1 = __importDefault(require("./seat"));
const aircraft_1 = __importDefault(require("./aircraft"));
class Seatmap extends sequelize_1.Model {
}
;
Seatmap.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    aircraft_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    seat_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    seatmap: {
        type: sequelize_1.DataTypes.STRING,
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
    modelName: 'Seatmaps',
});
Seatmap.belongsTo(seat_1.default, {
    foreignKey: "seat_id",
    as: "seats"
});
Seatmap.belongsTo(aircraft_1.default, {
    foreignKey: "aircraft_id",
    as: "aircrafts"
});
exports.default = Seatmap;
