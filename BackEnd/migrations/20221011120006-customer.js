'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Customers', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        length: 20,
      },
      first_name: {
        type: Sequelize.STRING,
        length: 10,
      },
      last_name: {
        type: Sequelize.STRING,
        length: 10,
      },
      phone_number: {
        type: Sequelize.STRING,
        length: 10,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }),
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Customers');
  },
};
