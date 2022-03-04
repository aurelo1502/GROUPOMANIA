//Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

//Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

//Routes
module.exports = {
    //Getting auth header
    createPost: function(req,res) {
        const headerAuth  = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //Params
        const title = req.body.title;
        const content = req.body.content;
       

        if (title === null || content == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({'error': 'invalid parameters'})
        }

        /*if (req.file) {
            post.attachment = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
        }*/

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { id: userId}
                })
                .then(function(userFound) {
                    done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({'error' : 'unable to verify user'})
            });
            },
            function(userFound, done) {
                if(userFound) {
                    models.Posts.create({
                        title: title,
                        content: content,
                        likes : 0,
                        UserId: userFound.id
                    })
                    .then(function(newPost){
                        done(newPost);
                    });
                } else {
                    res.status(404).json({'error': 'user not found'})
                }
            },
         ], function(newPost) {
             if (newPost) {
                 return res.status(201).json(newPost);
             } else {
                 return res.status(500).json({ 'error': 'cannot post message'});
             }
            });
        },
        listPosts: function(req, res) {
            const fields = req.query.fields;
            const limit = parseInt(req.query.limit);
            const offset = parseInt(req.query.offset);
            const order = req.query.order;

            /*if (limit > ITEMS_LIMIT) {
                limit = ITEMS_LIMIT;
              }*/
          
              models.Posts.findAll({
                order: [(order != null) ? order.split(':') : ['title', 'ASC']],
                attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                  model: models.User,
                  attributes: [ 'username' ]
                }]
              }).then(function(posts) {
                if (posts) {
                  res.status(200).json(posts);
                } else {
                  res.status(404).json({ "error": "no messages found" });
                }
              }).catch(function(err) {
                console.log(err);
                res.status(500).json({ "error": "invalid fields" });
              });
            }
          }
        