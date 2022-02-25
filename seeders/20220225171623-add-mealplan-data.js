'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MealPlans', [{
      spoonacularID: 123493,
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