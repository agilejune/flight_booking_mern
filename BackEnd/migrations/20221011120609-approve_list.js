'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Approve_lists', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      outgo_schedule_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Schedules',
          key: 'id',
        },
      },
      return_schedule_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Schedules',
          key: 'id',
        },
      },
      customer_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Customers',
          key: 'id',
        },
      },
      agent_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ['PENDING', 'APPROVED'],
        defaultValue: 'PENDING',
      },
      total_cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0,
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
    queryInterface.dropTable('Approve_lists');
  },
};
