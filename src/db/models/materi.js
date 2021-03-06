
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Materi.hasMany(models.Bab, {foreignKey: "materiId"})
      Materi.belongsToMany(models.Paket, { through: "PaketMateri", foreignKey: "materiId" })
    }
  };
  Materi.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Materi',
  });
  return Materi;
};