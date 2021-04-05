'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paket.belongsToMany(models.User, { through: "UserPaket" })
      Paket.belongsToMany(models.Materi, { through: "PaketMateri" })
    }
  };
  Paket.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    durasi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paket',
  });
  return Paket;
};