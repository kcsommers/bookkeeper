

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('notes', 'page', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('notes', 'page');
  }
};
