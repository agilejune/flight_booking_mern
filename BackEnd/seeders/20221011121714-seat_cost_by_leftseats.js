'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Seat_cost_by_leftseats", [
      {
        seat_id: 3,
        greater_than: 0,
        less_equal_than: 10,
        percentage: 0,
        status: 'ENABLE'
      },
      {
        seat_id: 3,
        greater_than: 10,
        less_equal_than: 20,
        percentage: 15,
        status: 'ENABLE'
      },
      {
        seat_id: 3,
        greater_than: 20,
        less_equal_than: 1000,
        percentage: 25,
        status: 'ENABLE'
      },
      {
        seat_id: 1,
        greater_than: 0,
        less_equal_than: 40,
        percentage: 0,
        status: 'ENABLE'
      },
      {
        seat_id: 1,
        greater_than: 40,
        less_equal_than: 90,
        percentage: 10,
        status: 'ENABLE'
      },
      {
        seat_id: 1,
        greater_than: 90,
        less_equal_than: 140,
        percentage: 15,
        status: 'ENABLE'
      },
      {
        seat_id: 1,
        greater_than: 140,
        less_equal_than: 1000,
        percentage: 25,
        status: 'ENABLE'
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Seat_cost_by_leftseats", null, {});
  },
};