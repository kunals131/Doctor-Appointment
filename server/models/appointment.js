'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient,Doctor, Schedule}) {
      // define association here
      this.belongsTo(Patient, {foreignKey : 'patientId', as : 'patient'});
      this.belongsTo(Doctor, {foreignKey : 'doctorId', as : 'doctor'});
      this.hasMany(Schedule, {foreignKey : 'appointmentId', as : 'schedules'});
    }
  }
  Appointment.init({
    title : {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : 'New Appointment' 
    },
    doctorId : {
      type : DataTypes.UUID,
      allowNull : false
    },
    patientId : {
      type : DataTypes.UUID,
      allowNull : false
    },
    state : {
      type : DataTypes.ENUM('accepted', 'rejected', 'sent'),
      allowNull : false,
      defaultValue : 'sent'
    },
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName : 'appointments'
  });
  return Appointment;
};