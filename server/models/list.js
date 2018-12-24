
module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define('list', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  list.associate = (/* models */) => {
    // associations can be defined here
  };
  return list;
};