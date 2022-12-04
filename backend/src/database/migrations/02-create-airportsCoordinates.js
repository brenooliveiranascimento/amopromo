module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('airports_coordinates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lat: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      lon: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      airportId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'airports',
          key: 'id',
        },
        field: 'airport_id',
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('airports_coordinates');
  },
};