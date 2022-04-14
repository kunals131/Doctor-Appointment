'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true,
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        isEmail : {msg : 'Email must be a valid email address'},
        notNull : {msg : 'Email must not be null'},
      }
    },
    role : {
      type : DataTypes.ENUM("doctor", "patient"),
      defaultValue : "patient",
      allowNull : false,
    },
    contact : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isNumeric : 'Invalid Contact Number',
        notEmpty : {msg : 'Contact must not be empty'}
      }
    },
    password : {
      type : DataTypes.STRING(400),
      allowNull : false,
    },
    lat : DataTypes.STRING,
    long : DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
    tableName : 'users'
  });
  return User;
};