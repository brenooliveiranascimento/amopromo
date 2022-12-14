module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iata: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      statusMessage: {
        allowNull: true,
        type: Sequelize.STRING(300),
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('airports');
  },
};