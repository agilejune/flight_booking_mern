'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Booklists', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
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
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
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
      payment_type: {
        type: Sequelize.ENUM,
        values: ['CARD', 'CASH', 'MOBILE'],
      },
      payment_status: {
        type: Sequelize.ENUM,
        values: ['CONFIRMED', 'FAILED', 'REFUNDED'],
      },
      status: {
        type: Sequelize.ENUM,
        values: ['BOOKED', 'CANCELED'],
        defaultValue: 'BOOKED',
      },
      total_cost: {
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
    queryInterface.dropTable('Booklists');
  },
};
