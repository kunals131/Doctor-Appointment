'use strict';


const {DataTypes} = require('sequelize');


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor', {
      uuid : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
        primaryKey : true,
      },
      university : {
        type : DataTypes.STRING,
        allowNull : true
      },
      degree : {
        type : DataTypes.STRING,
        allowNull : true,
      },
      userId : {
        type : DataTypes.UUID,
        allowNull : false
      },
      isComplete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
        allowNull : false
      },
      address : {
        type : DataTypes.STRING,
        allowNull : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctor');
  }
};