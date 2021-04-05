'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubBab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubBab.belongsTo(models.Bab, {foreignKey: "bab_id"})
    }
  };
  SubBab.init({
    bab_id: DataTypes.INTEGER,
    subbab: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubBab',
  });
  return SubBab;
};