'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Seats", [
      {
        type: 'Economy Class',
      },
      {
        type: 'Premium Economy Class',
      },
      {
        type: 'Business Class',
      },
      {
        type: 'First Class',
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Seats", null, {});
  },
};