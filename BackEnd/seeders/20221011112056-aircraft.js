'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Aircrafts", [
      {
        name: 'Airbus A330',
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Aircrafts", null, {});
  },
};