'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Seat_cost_by_dates", [
      {
        greater_than: 14,
        less_equal_than: 1000,
        percentage: 0,
        status: 'ENABLE'
      },
      {
        greater_than: 9,
        less_equal_than: 13,
        percentage: 5,
        status: 'ENABLE'
      },
      {
        greater_than: 8,
        less_equal_than: 9,
        percentage: 7,
        status: 'ENABLE'
      },
      {
        greater_than: 7,
        less_equal_than: 8,
        percentage: 9,
        status: 'ENABLE'
      },
      {
        greater_than: 6,
        less_equal_than: 7,
        percentage: 10,
        status: 'ENABLE'
      },
      {
        greater_than: 5,
        less_equal_than: 6,
        percentage: 12,
        status: 'ENABLE'
      },
      {
        greater_than: 4,
        less_equal_than: 5,
        percentage: 14,
        status: 'ENABLE'
      },
      {
        greater_than: 3,
        less_equal_than: 4,
        percentage: 16,
        status: 'ENABLE'
      },
      {
        greater_than: 0,
        less_equal_than: 3,
        percentage: 25,
        status: 'ENABLE'
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Seat_cost_by_dates", null, {});
  },
};