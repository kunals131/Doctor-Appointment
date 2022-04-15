'use strict';

const {DataTypes} = require('sequelize');


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount : {
        type : DataTypes.INTEGER,
        allowNull: false,
      },
      status : {
        type : DataTypes.ENUM('pending', 'success', 'cancelled'),
        defaultValue : 'pending',
        allowNull : false
      },
      from : {
        type : DataTypes.UUID,
        allowNull :false
      },
      to : {
        type : DataTypes.UUID,
        allowNull : false
      },
      remark : {
        type : DataTypes.TEXT,
        allowNull : true
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
    await queryInterface.dropTable('payments');
  }
};