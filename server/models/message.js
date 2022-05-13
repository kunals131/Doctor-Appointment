'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient,User,Doctor,Appointment}) {
      // define association here
      this.belongsTo(User, {foreignKey : 'from', as : 'sender'});
      this.belongsTo(User, {foreignKey : 'to', as : 'receiver'});
      this.belongsTo(Appointment, {foreignKey : 'appointmentId'});

    
    }
  }
  message.init({
    text : {
      type : DataTypes.STRING(700),
      allowNull : false
    },
    type : {
      type : DataTypes.STRING,
      allowNull : true
    },
    appointmentId : {
      type : DataTypes.UUID,
      allowNull : false
    },

    state : {
      type : DataTypes.STRING,
      allowNull : true
    },
    from : {
      type : DataTypes.UUID,
      allowNull : false
    },
    to : {
      type : DataTypes.UUID,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName : 'messages'
  });
  return message;
};