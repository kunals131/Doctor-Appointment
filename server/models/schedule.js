'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Appointment}) {
      // define association here
      this.belongsTo(Appointment, {foreignKey : 'appointmentId', as : 'appointment'});

    }
  }
  Schedule.init({
    title : {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : 'New Schedule'
    },
    at : {
      type : DataTypes.DATE,
      allowNull : false,
    },
    appointmentId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    state : {
      type : DataTypes.ENUM('future', 'past', 'done', 'cancelled'),
      allowNull : false,
      defaultValue : 'future'
    }
    
  }, {
    sequelize,
    modelName: 'Schedule',
    tableName : 'schedules'
  });
  return Schedule;
};