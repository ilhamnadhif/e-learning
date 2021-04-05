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
      Bab.belongsTo(models.Materi, {foreignKey: "materi_id"})
      Bab.hasMany(models.SubBab, {foreignKey: "bab_id"})
    }
  };
  Bab.init({
    bab: DataTypes.STRING,
    materi_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bab',
  });
  return Bab;
};