const Comment = require("../models/comments");
const Posts = require ('../models/posts');

exports.createComment = (req, res) => {
  const postsId = req.params.id;
  const userId = res.locals.userId;
  const content = req.body.content;
  const commentPost = new Comment({
    PostsId: postsId,
    UserId: userId,
    content: content,
  });
  commentPost
    .save()
    .then((value) => {
      models.Comment.findOne({
        where: { id: value.id },
        include: [
          {
            association: Comment.User,
          },
        ],
      }).then((newComment) => {
        res.status(201).json(newComment);
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getOneComment = (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.updateComment = (req, res) => {
  const id = req.params.id;
  const userId = res.locals.userId;
  const content = req.body.content;

  Comment.update({ content }, { where: { id: id, UserId: userId } })
    .then(() => {
      res.status(200).json({ message: "comment update" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deleteComment = (req, res) => {
  const userId = res.locals.userId;
  Comment.destroy({ where: { id: req.params.id, UserId: userId } })
    .then(() => {
      res.status(200).json({ message: "delete with succes !" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getAllComments = (req, res) => {
  const postsId = req.params.id;
  Comment.findAll({ where: { PostsId: postsId } })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
};