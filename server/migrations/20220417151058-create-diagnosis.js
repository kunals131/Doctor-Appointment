'use strict';

const {DataTypes} = require('sequelize');


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diagnoses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title : {
        type : DataTypes.STRING,
        defaultValue : 'New Diagnosis',
        allowNull : false
      },
      disease : {
        type : DataTypes.STRING,
        allowNull : false
      },
      accuracy : {
        type : DataTypes.STRING,
        defaultValue : '90%',
        allowNull : false
      },
      patientId : {
        type : DataTypes.UUID,
        allowNull : false
      },
      symptoms : {
        type : DataTypes.STRING(1000),
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
    await queryInterface.dropTable('diagnoses');
  }
};