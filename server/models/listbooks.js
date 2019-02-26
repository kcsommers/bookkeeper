module.exports = (sequelize, DataTypes) => {
  const listsBooks = sequelize.define('listsBooks', {
    listId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  listsBooks.associate = (models) => {
    // associations can be defined here
  };
  return listsBooks;
};