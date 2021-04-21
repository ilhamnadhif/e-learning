'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Subscribe.init({
    userId: DataTypes.INTEGER,
    paketId: DataTypes.INTEGER,
    pilih_paket: DataTypes.INTEGER,
    gambar_bayar: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscribe',
  });
  return Subscribe;
};