'use strict';

const {DataTypes} = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
    await queryInterface.dropTable('schedules');
  }
};