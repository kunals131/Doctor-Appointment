'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Doctor, Patient, Message}) {
      // define association here
      this.hasOne(Doctor, {foreignKey : 'userId', as : 'doctorDetails'});
      this.hasOne(Patient, {foreignKey : 'userId', as : 'patientDetails'});
      this.hasMany(Message , {foreignKey : 'from', as : 'messagesSent'});
      this.hasMany(Message , {foreignKey : 'to', as : 'messagesRecieved'});
    }
    toJSON() {
      const role = this.getDataValue('role');
      const updatedString = role==='doctor'?'doctorDetails':'patientDetails'
      const data = this.getDataValue(updatedString);
      if (!data) return {...this.get(), password : undefined}
      return {...this.get(), password : undefined, additionalData :data, dataId :data.uuid, doctorDetails : undefined, patientDetails : undefined   }

    }
  }
  User.init({
    fullName : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true,
    },
    profileViews : {
      type : DataTypes.INTEGER,
      allowNull : true,
      defaultValue : 0
    },
    isNew : {
      type : DataTypes.BOOLEAN,
      defaultValue : true,
      allowNull : false
    },
    isComplete : {
      type : DataTypes.BOOLEAN,
      defaultValue : false,
      allowNull : false
    },
    img : {
      type : DataTypes.STRING,
      defaultValue : 'https://res.cloudinary.com/insight-byte/image/upload/v1649939622/austin-distel-7bMdiIqz_J4-unsplash_rmcvfa.jpg',
      allowNull : false
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        isEmail : {msg : 'Email must be a valid email address'},
        notNull : {msg : 'Email must not be null'},
      }
    },
    role : {
      type : DataTypes.ENUM("doctor", "patient"),
      defaultValue : "patient",
      allowNull : false,
    },
    contact : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isNumeric : 'Invalid Contact Number',
        notEmpty : {msg : 'Contact must not be empty'}
      }
    },
    password : {
      type : DataTypes.STRING(400),
      allowNull : false,
    },
    lat : DataTypes.STRING,
    long : DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
    tableName : 'users'
  });
  return User;
};