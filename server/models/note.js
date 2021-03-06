// module.exports = (sequelize, DataTypes) => {
//   const note = sequelize.define('note', {
//     content: DataTypes.TEXT,
//     bookId: DataTypes.INTEGER,
//     userId: DataTypes.INTEGER
//   }, {});
//   note.associate = (models) => {
//     // associations can be defined here
//     models.note.belongsTo(models.book);
//     models.note.belongsTo(models.user);
//   };
//   return note;
// };

module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define('note', {
    type: DataTypes.STRING,
    content: DataTypes.TEXT,
    page: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  note.associate = (models) => {
    // associations can be defined here
    models.note.belongsTo(models.book);
    models.note.belongsTo(models.user);
  };
  return note;
};