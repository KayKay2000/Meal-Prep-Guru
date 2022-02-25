'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MealPlans', [{
      name: 'Super Foods Plan',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MealPlans', {
      id: {
        [Sequelize.Op.or]: [
          1,
        ]
      }
    })
  }
};