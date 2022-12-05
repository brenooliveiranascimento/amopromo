module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('last_airports_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lastUpdate: {
        allowNull: false,
        type: Sequelize.STRING(30),
        field: 'last_update',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('last_airports_requests');
  },
};