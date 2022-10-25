'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Airports", [
      {
        city: 'Accra',
        name: 'ACC',
        address: 'Accra, Ghana'
      },
      {
        city: 'London',
        name: 'LON',
        address: 'London, United Kingdom'
      },
      {
        city: 'Toronto',
        name: 'YYZ',
        address: 'Toronto, ON, Canada'
      },
      {
        city: 'Baltimore',
        name: 'BWI',
        address: 'Baltimore, MD 21240, United States'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Airports", null, {});
  },
};