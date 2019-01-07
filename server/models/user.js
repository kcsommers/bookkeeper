module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Username is required' }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Email is required' }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Password is required' }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Location is required' }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Image is required' }
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Banner is required' }
    }
  }, { hooks: {} });
  user.associate = (models) => {
    // associations can be defined here
    models.user.hasMany(models.list);
    models.user.hasMany(models.note);
    models.user.hasMany(models.quote);
    models.user.belongsToMany(models.book, { through: 'usersBooks' });
  };
  return user;
};