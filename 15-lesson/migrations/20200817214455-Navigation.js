'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('navigations', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      navigation: {
          allowNull: false,
          type: Sequelize.STRING,
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('navigations');
  }
};
