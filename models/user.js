'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite);
      User.hasMany(models.MealPlan);
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.TEXT,
    spoonacularUsername: DataTypes.STRING,
    spoonacularHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};