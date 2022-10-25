'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
class Customer extends sequelize_1.Model {
}
;
Customer.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    birthday: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
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
    modelName: 'Customers',
});
exports.default = Customer;
