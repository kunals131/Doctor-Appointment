'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Speciality,  Appointment, Payment}) {
      // define association here
      this.belongsTo(User, {foreignKey : 'userId', as : 'user'})
      this.hasMany(Speciality, {foreignKey : 'doctorId', as: 'specialities'});
      this.hasMany(Appointment,{foreignKey : 'doctorId', as : 'appointments'});
      this.hasMany(Payment, {foreignKey : 'to', as : 'payments'});
    }

  }
  doctor.init({
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true,
    },

    medicalExperience : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    lisenceId : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    university : {
      type : DataTypes.STRING,
      allowNull : true
    },
    degree : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    userId : {
      type : DataTypes.UUID,
      allowNull : false
    },

    lat : {
      type : DataTypes.STRING,
      allowNull : true
    },
    tags : {
      type : DataTypes.TEXT,
      allowNull : true,
    },
    long : {
      type : DataTypes.STRING,
      allowNull  :true
    },
    address : {
      type : DataTypes.STRING,
      allowNull : true
    }
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName : 'doctor'
  });
  return doctor;
};