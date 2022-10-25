'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Schedules', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      depart_airport_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Airports',
          key: 'id',
        },
      },
      arrive_airport_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Airports',
          key: 'id',
        },
      },
      aircraft_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Aircrafts',
          key: 'id',
        },
      },
      depart_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrive_time: {
        type: Sequelize.DATE,
        allowNull: false,
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
    queryInterface.dropTable('Schedules');
  },
};
