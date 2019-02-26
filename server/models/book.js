module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    banner: DataTypes.STRING,
    current: DataTypes.BOOLEAN
  }, {});
  book.associate = (models) => {
    // associations can be defined here
    models.book.belongsToMany(models.user, { through: 'usersBooks' });
    models.book.belongsToMany(models.list, { through: 'listsBooks' });
    models.book.hasMany(models.note);
    models.book.hasMany(models.quote);
  };
  return book;
};