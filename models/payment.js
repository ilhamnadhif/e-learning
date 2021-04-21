'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User, {foreignKey: "userId"})
      Payment.belongsTo(models.Paket, {foreignKey: "paketId"})
    }
  };
  Payment.init({
    userId: DataTypes.INTEGER,
    paketId: DataTypes.INTEGER,
    bukti_bayar: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};