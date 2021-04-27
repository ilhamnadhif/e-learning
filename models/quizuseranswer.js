'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizUserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizUserAnswer.belongsTo(models.User, {foreignKey: "userId"})
      QuizUserAnswer.belongsTo(models.QuizQuestion, {foreignKey: "questionId"})
      QuizUserAnswer.belongsTo(models.QuestionOption, {foreignKey: "optionId", as:"option"})
      QuizUserAnswer.belongsTo(models.QuestionOption, {foreignKey: "is_correct", as: "iscorrect"})
    }
  };
  QuizUserAnswer.init({
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,
    is_correct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizUserAnswer',
  });
  return QuizUserAnswer;
};