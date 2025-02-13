'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Define association: A Book belongs to a User
      Book.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.INTEGER,
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the table name
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
