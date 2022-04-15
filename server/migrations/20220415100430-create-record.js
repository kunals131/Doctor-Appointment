'use strict';
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
        type : DataTypes.TEXT,
        allowNull : false
      },
      remark : {
        type : DataTypes.TEXT,
        allowNull : true
      },
      title : {
        type : DataTypes.TEXT,
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