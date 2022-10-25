'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tickets', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      schedule_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Schedules',
          key: 'id',
        },
      },
      seat_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Seats',
          key: 'id',
        },
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
    queryInterface.dropTable('Tickets');
  },
};
