'use strict';

const {DataTypes} = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        type : DataTypes.STRING,
        allowNull : false
      },
      dosage : {
        type : DataTypes.STRING(2000),
        allowNull : false
      },
      prescribedBy : {
        type : DataTypes.UUID,
        allowNull : true
      },
      patientId : {
        type : DataTypes.UUID,
        allowNull : false
      },
      remark : {
        type : DataTypes.STRING,
        allowNull : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      state : {
        type : DataTypes.ENUM('done', 'ongoing'),
        allowNull : false,
        defaultValue : 'ongoing'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medications');
  }
};