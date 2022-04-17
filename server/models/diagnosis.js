'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diagnosis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient}) {
      // define association here
      this.belongsTo(Patient, {foreignKey : 'patientId', as : 'patient'})
    }
  }
  diagnosis.init({
    title : {
      type : DataTypes.STRING,
      defaultValue : 'New Diagnosis',
      allowNull : false
    },
    disease : {
      type : DataTypes.STRING,
      allowNull : false
    },
    accuracy : {
      type : DataTypes.STRING,
      defaultValue : '90%',
      allowNull : false
    },
    patientId : {
      type : DataTypes.UUID,
      allowNull : false
    },
    symptoms : {
      type : DataTypes.STRING(1000),
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Diagnosis',
    tableName : 'diagnoses'
  });
  return diagnosis;
};