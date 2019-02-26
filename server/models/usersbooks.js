module.exports = (sequelize, DataTypes) => {
  const usersBooks = sequelize.define('usersBooks', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  usersBooks.associate = (models) => {
    // associations can be defined here
  };
  return usersBooks;
};