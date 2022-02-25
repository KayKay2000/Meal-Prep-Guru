'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Favorites', [{
      recipeID: 10,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Favorites', {
      id: {
        [Sequelize.Op.or]: [
          1,
        ]
      }
    })
  }
};
