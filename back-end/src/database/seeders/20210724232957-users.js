'use strict';
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('users',
      [{
        name: 'Fulanildo Vendedor',
        email: 'sales@sellall.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        role: 'seller',
      },
      {
        name: 'Cicranildo Comprador',
        email: 'buy@buyall.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        role: 'customer',
      },
      {
        name: 'Beltranildo Vendedor',
        email: 'bel@bel.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        role: 'seller',
      },
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        role: 'administrator',
      },
      ],
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
