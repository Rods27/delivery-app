'use strict';
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('salesProducts',
      [{
        sale_id: 1,
        product_id: 4,
        quantity: 5,
      },
      {
        sale_id: 1,
        product_id: 5,
        quantity: 1,
      },
      {
        sale_id: 1,
        product_id: 1,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 1,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 4,
        quantity: 10,
      },
      {
        sale_id: 2,
        product_id: 5,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 6,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 10,
        quantity: 6,
      },
      {
        sale_id: 2,
        product_id: 12,
        quantity: 1,
      },
      ],
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('salesProducts', null, {});
  }
};
