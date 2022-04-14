'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient}) {
      // define association here
      this.belongsTo(Patient, {foreignKey : 'patientId', as : 'patient'});

    }
  }
  Symptom.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    patientId : {
      type : DataTypes.UUID,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Symptom',
    tableName : 'symptoms'
  });
  return Symptom;
};