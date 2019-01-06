
module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define('list', {
    name: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'List name is required' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: 'UserId is required' }
    }
  }, {});
  list.associate = (models) => {
    // associations can be defined here
    models.list.belongsTo(models.user);
    models.list.belongsToMany(models.book, { through: 'listsBooks' });
  };
  return list;
};