'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionOption.belongsTo(models.QuizQuestion, {foreignKey: "questionId"})
      QuestionOption.hasOne(models.QuizUserAnswer, {foreignKey: "optionId"})
      QuestionOption.hasOne(models.QuizUserAnswer, {foreignKey: "is_correct"})
    }
  };
  QuestionOption.init({
    questionId: DataTypes.INTEGER,
    option: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuestionOption',
  });
  return QuestionOption;
};