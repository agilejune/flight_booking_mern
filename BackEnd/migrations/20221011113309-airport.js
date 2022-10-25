'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Airports', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING,
        length: 20,
      },
      name: {
        type: Sequelize.STRING,
        length: 10,
      },
      address: {
        type: Sequelize.STRING,
        length: 10,
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
  down (queryInterface, Sequelize) {
    queryInterface.dropTable('Airports');
  }
};
