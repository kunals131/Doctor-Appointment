'use strict';

const {DataTypes} = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        type : DataTypes.ENUM('accepted', 'rejected', 'sent', 'closed'),
        allowNull : false,
        defaultValue : 'sent'
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
    await queryInterface.dropTable('appointments');
  }
};