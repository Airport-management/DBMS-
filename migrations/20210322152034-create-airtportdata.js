'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('airtportdata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
,allowNull:false      },
      city: {
        type: Sequelize.STRING(100)
        ,allowNull:false
      },
      state: {
        type: Sequelize.STRING(100)
        ,allowNull:false
      },
      cleanliness: {
        type: Sequelize.INTEGER
      },
      ranking: {
        type: Sequelize.INTEGER
      },
      traffic: {
        type: Sequelize.INTEGER
      },
      airlines: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING(250)
        ,allowNull:false
      },
      recommendation: {
        type: Sequelize.TEXT
      },
      service: {
        type: Sequelize.INTEGER
      },
      taxi: {
        type: Sequelize.TEXT
      },
      foodchains: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('airtportdata');
  }
};