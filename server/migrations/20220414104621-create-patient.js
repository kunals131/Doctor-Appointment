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
      userId : {
        type : DataTypes.UUID,
        allowNull : false
      },
      isComplete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
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