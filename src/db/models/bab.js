'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bab.belongsTo(models.Materi, {foreignKey: "materiId"})
      Bab.hasMany(models.SubBab, {foreignKey: "babId"})
      Bab.hasMany(models.QuizQuestion, {foreignKey: "babId"})
    }
  };
  Bab.init({
    materiId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bab',
  });
  return Bab;
};