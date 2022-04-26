'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient, Doctor}) {
      this.belongsTo(Patient, {foreignKey : 'patientId', as : 'patient'});
    }
  }
  medication.init({
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    dosage : {
      type : DataTypes.STRING(2000),
      allowNull : false
    },
    prescribedBy : {
      type : DataTypes.UUID,
      allowNull : true
    },
    patientId : {
      type : DataTypes.UUID,
      allowNull : false
    },
    remark : {
      type : DataTypes.STRING,
      allowNull : true
    },
    state : {
      type : DataTypes.ENUM('done', 'ongoing'),
      allowNull : false,
      defaultValue : 'ongoing'
    }
  }, {
    sequelize,
    modelName: 'Medication',
    tableName : 'medications'
  });
  return medication;
};