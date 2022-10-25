'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Seat_cost_by_leftseats', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      seat_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Seats',
          key: 'id',
        },
      },
      greater_than: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      less_equal_than: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ENABLE', 'DISABLE'],
        defaultValue: 'ENABLE',
      },
      percentage: {
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
    queryInterface.dropTable('Seat_cost_by_leftseats');
  },
};
