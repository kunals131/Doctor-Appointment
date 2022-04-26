'use strict';


const {DataTypes} = require('sequelize');


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient', {
      uuid : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
        primaryKey : true,
      },
      age : {
        type : DataTypes.INTEGER,
        allowNull : true,
      },
      medicalHistory : {
        type : DataTypes.INTEGER,
        allowNull : true
      },
      bloodGroup : {
        type : DataTypes.STRING,
        allowNull : true
      },
      userId : {
        type : DataTypes.UUID,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patient');
  }
};