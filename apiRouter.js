const express = require('express');
const usersCtrl = require('./controllers/user.controller');
const postsCtrl = require('./controllers/posts.controller');
const likesCtrl = require ('./controllers/likes.controller');
const commentCtrl = require ('./controllers/comments.controller');


//ROUTER
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.post('/users/register/', usersCtrl.register);
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/me/', usersCtrl.getUserProfile);
    apiRouter.put('/users/me/', usersCtrl.updateUserProfile);
    apiRouter.delete('/users/me/', usersCtrl.deleteUserProfile);

    // Posts routes
    apiRouter.put('/posts/new/', postsCtrl.createPost);
    apiRouter.get('/posts/', postsCtrl.listPosts);

    //Likes
    apiRouter.post('/posts/:postId/like/'), likesCtrl.likePost;
    apiRouter.post('/posts/:postId/dislike/'), likesCtrl.dislikePost;

    //Comments
    apiRouter.post('/posts/:postId/comment/'), commentCtrl.createComment;
    apiRouter.get('/posts/:postId/comment/:commentId/'), commentCtrl.getOneComment;
    apiRouter.put('/posts/:postId/comment/:commentId/'), commentCtrl.updateComment;
    apiRouter.delete('/posts/:postId/comment/commentId/'), commentCtrl.deleteComment;
    apiRouter.get('/posts/comment/'), commentCtrl.getAllComments;



    return apiRouter;

})();