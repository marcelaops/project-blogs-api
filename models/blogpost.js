module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE, // createdAt
    updated: DataTypes.DATE, // updateAt
  }, 
  { timestamps: false });
  // invés de usar o published e o updated com dataType.DATE aproveitar os timespamps ?! -> deixar p depois
  // Ficaria assim:
  // { createdAt: 'published', updatedAt: 'updated' },

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return BlogPost;
};