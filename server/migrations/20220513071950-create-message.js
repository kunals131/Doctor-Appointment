'use strict';
const {DataTypes} = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        allowNull : true,
        defaultValue : 'unseen'
      },
      from : {
        type : DataTypes.UUID,
        allowNull : false
      },
      to : {
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
    await queryInterface.dropTable('messages');
  }
};