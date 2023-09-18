const comment = require('../models/comment');
const post = require('../models/post');

module.exports.create = function(req,res){
    post.findById(req.body.post)

    .then(post =>{
      comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      })  
      .then(comment =>{
        post.comments.push(comment);
        post.save();

        res.redirect('/');
      })
      .catch(error =>{
        console.log('error in comments',error)
        res.redirect('/');
      })
    });
}
 

