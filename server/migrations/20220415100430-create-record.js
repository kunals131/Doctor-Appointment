'use strict';

const {DataTypes} = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
    await queryInterface.dropTable('records');
  }
};