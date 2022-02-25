'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'slickrick1017',
      firstName: 'Rick',
      lastName: 'Rackley',
      email: 'rr31017@yahoo.com',
      password: 'madmoney1017',
      phone: '770-736-6273',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      id: {
        [Sequelize.Op.or]: [
          1,
        ]
      }
    })
  }
};
