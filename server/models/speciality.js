'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Doctor}) {
      // define association here
      this.belongsTo(Doctor, {foreignKey : 'doctorId', as : 'doctor'});
    }
  }
  Speciality.init({
    title : {
      type : DataTypes.STRING,
      allowNull : false
    },
    doctorId : {
      type :DataTypes.UUID,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Speciality',
    tableName : 'specialities'
  });
  return Speciality;
};