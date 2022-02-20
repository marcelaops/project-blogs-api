module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false },
  { tableName: 'User' });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blogposts',
      foreignKey: 'userId',
    });
  };

  return User;
};
