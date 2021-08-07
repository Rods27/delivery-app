'use strict';
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 2,
        seller_id: 1,
        total_price: 15.20,
        delivery_address: 'Rua virando a direita, Centro',
        delivery_number: 123,
        sale_date: '2021-08-07 20:42:23',
        status: 'Entregue',
      },
      {
        id: 2,
        user_id: 2,
        total_price: 82.20,
        seller_id: 1,
        delivery_address: 'Rua virando a direita, Centro',
        delivery_number: '123',
        sale_date: '2021-08-07 20:42:23',
        status: 'Preparando',
      },
      ],
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('sales', null, {});
  }
};
