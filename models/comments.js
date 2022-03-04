'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    postsId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Posts",
        key: 'id'
      }
    },
    userId : {
      type: DataTypes.INTEGER,
      references: {
        models: "User",
        key: 'id'
      }
    }, 
    content : {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: 'test'
    }
  }, 
  {});
  Comment.associate = function (models) {
    models.User.belongsToMany(models.Posts, {
      through: models.Comments,
      foreignKey: 'userId',
      otherKey: 'postsId'
    });
    models.Posts.belongsToMany(models.User, {
      through: models.Comments,
      foreignKey: 'postsId',
      otherKey: 'userId',
    });
    models.Comments.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    models.Comments.belongsTo(models.Posts, {
      foreignKey: 'postsId',
      as: 'posts',
    });
  };
  return Comment;
};



 /* class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Posts, {
        through: models.Comments,
        foreignKey: 'userId',
        otherKey: 'postsId',
      });
  
      models.Posts.belongsToMany(models.User, {
        through: models.Comments,
        foreignKey: 'postsId',
        otherKey: 'userId',
      });

      models.Comments.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      models.Comments.belongsToMany(models.Posts, {
        through: models.Comments,
        foreignKey: 'userId',
        otherKey: 'postsId',
      });
    }
  }
  Comments.init({
    postsId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};*/