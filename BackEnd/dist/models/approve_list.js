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
class ApproveList extends sequelize_1.Model {
}
ApproveList.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false
    },
    agent_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    total_cost: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'APPROVED'),
        defaultValue: 'PENDING'
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
    modelName: 'Approve_lists',
});
ApproveList.belongsTo(schedule_1.default, {
    foreignKey: "outgo_schedule_id",
    as: "outgo_schedule"
});
ApproveList.belongsTo(schedule_1.default, {
    foreignKey: "return_schedule_id",
    as: "return_schedule"
});
ApproveList.belongsTo(customer_1.default, {
    foreignKey: "customer_id",
    as: "customer"
});
ApproveList.belongsTo(user_1.default, {
    foreignKey: "agent_id",
    as: "agent"
});
exports.default = ApproveList;
