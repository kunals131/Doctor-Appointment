'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  message.init({
    text : {
      type : DataTypes.STRING(700),
      allowNull : false
    },
    type : {
      type : DataTypes.STRING,
      allowNull : true
    },
    from : {
      type : DataTypes.UUID,
      allowNull : false
    },
    to : {
      type : DataTypes.UUID,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};