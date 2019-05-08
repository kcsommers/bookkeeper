

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('notes', 'type', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('notes', 'type');
  }
};
