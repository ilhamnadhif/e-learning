'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizQuestion.belongsTo(models.Bab, {foreignKey: "babId"})
      QuizQuestion.hasMany(models.QuestionOption, {foreignKey: "questionId"})
      QuizQuestion.hasOne(models.QuizUserAnswer, {foreignKey: "questionId"})
    }
  };
  QuizQuestion.init({
    babId: DataTypes.INTEGER,
    question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuizQuestion',
  });
  return QuizQuestion;
};