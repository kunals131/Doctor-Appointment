'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Speciality, Tag, Appointment}) {
      // define association here
      this.belongsTo(User, {foreignKey : 'userId', as : 'user'})
      this.hasMany(Speciality, {foreignKey : 'doctorId', as: 'specialities'});
      this.hasMany(Tag, {foreignKey : 'doctorId', as : 'tags'});
      this.hasMany(Appointment,{foreignKey : 'doctorId', as : 'appointments'});
    }

  }
  doctor.init({
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true,
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
    isComplete : {
      type : DataTypes.BOOLEAN,
      defaultValue : false,
      allowNull : false
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