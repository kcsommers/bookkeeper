module.exports = (sequelize, DataTypes) => {
  const quote = sequelize.define('quote', {
    content: DataTypes.TEXT,
    page: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  quote.associate = (models) => {
    // associations can be defined here
    models.quote.belongsTo(models.book);
    models.quote.belongsTo(models.user);
  };
  return quote;
};