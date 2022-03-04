
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    postsId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: DataTypes.TEXT
  }, 
  {});
  Like.associate = function(models) {
    // associations can be defined here

    models.User.belongsToMany(models.Posts, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'postsId',
    });

    models.Posts.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'postsId',
      otherKey: 'userId',
    });

    models.Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Like.belongsTo(models.Posts, {
      foreignKey: 'postsId',
      as: 'posts',
    });
  };
  return Like;
};