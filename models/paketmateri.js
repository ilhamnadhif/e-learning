'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaketMateri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PaketMateri.init({
    PaketId: DataTypes.INTEGER,
    MateriId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaketMateri',
  });
  return PaketMateri;
};