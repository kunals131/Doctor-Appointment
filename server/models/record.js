'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient}) {
      // define association here
      this.belongsTo(Patient, {foreignKey : 'patientId' , as : 'patient' })
    }
  }
  Record.init({
    file : {
      type : DataTypes.STRING(400),
      allowNull : false
    },
    remark : {
      type : DataTypes.STRING(1234),
      allowNull : true
    },
    title : {
      type : DataTypes.STRING,
      allowNull : false
    },
    patientId : {
      type : DataTypes.UUID,
      allowNull : false,
    }

  }, {
    sequelize,
    modelName: 'Record',
    tableName : 'records'
  });
  return Record;
};