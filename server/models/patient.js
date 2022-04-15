'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Symptom, Appointment, Payment, Record}) {
      // define association here
      this.belongsTo(User, {foreignKey : 'userId', as : 'user'})
      this.hasMany(Symptom, {foreignKey : 'patientId' , as : 'symptoms' })
      this.hasMany(Appointment,{foreignKey : 'patientId', as : 'appointments'});
      this.hasMany(Payment,{foreignKey : 'from', as : 'payments'});
      this.hasMany(Record, {foreignKey : 'patientId', as : 'medicalRecords'})
    }
  }
  patient.init({
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true,
    },
    userId : {
      type : DataTypes.UUID,
      allowNull : false
    },
    isComplete : {
      type : DataTypes.BOOLEAN,
      defaultValue : false,
      allowNull : false
    },
    
  }, {
    sequelize,
    modelName: 'Patient',
    tableName : 'patient'
  });
  return patient;
};