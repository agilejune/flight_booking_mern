'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Approve_seats', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      approve_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Approve_lists',
          key: 'id',
        },
      },
      schedule_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      seat_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Seats',
          key: 'id',
        },
      },
      seat_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0,
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
    queryInterface.dropTable('Approve_seats');
  },
};
