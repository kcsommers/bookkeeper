'use strict';
module.exports = (sequelize, DataTypes) => {
  var listsBooks = sequelize.define('listsBooks', {
    listId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  listsBooks.associate = function(models) {
    // associations can be defined here
  };
  return listsBooks;
};