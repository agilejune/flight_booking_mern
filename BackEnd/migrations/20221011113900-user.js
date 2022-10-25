'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
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
      password: {
        type: Sequelize.STRING,
        length: 50,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['ADMIN', 'AGENT', 'USER'],
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
    queryInterface.dropTable('Users');
  },
};
