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
    static associate({Doctor,Patient}) {
      // define association here
      this.belongsTo(Doctor, {foreignKey : 'to', as : 'paidTo'});
      this.belongsTo(Patient, {foreignKey : 'from', as : 'recievedFrom'});
    }
  }
  Payment.init({
    amount : {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        min : 0
      }
    },
    status : {
      type : DataTypes.ENUM('pending', 'success', 'cancelled'),
      defaultValue : 'pending',
      allowNull : false
    },
    from : {
      type : DataTypes.UUID,
      allowNull :false
    },
    to : {
      type : DataTypes.UUID,
      allowNull : false
    },
    remark : {
      type : DataTypes.TEXT,
      allowNull : true
    }
    
  }, {
    sequelize,
    modelName: 'Payment',
    tableName : 'payments'
  });
  return Payment;
};