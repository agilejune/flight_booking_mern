'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Seatmaps', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      aircraft_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Aircrafts',
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
      seatmap: {
        type: Sequelize.TEXT('long'),
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
    queryInterface.dropTable('Seatmaps');
  }
};
