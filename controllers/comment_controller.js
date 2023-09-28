const comment = require('../models/comment');
const post = require('../models/post');

//we should use try catch from next time
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
        req.flash('success', 'Comment added!')
        res.redirect('/');
        
      })
      .catch(error =>{
        req.flash('error', error);
        res.redirect('/');
      })
    });
}

module.exports.destroy = function(req,res){
  comment.findById(req.params.id)
.then(comment => {
  if (comment.user == req.user.id) {
    let postId = comment.post;
    comment.deleteOne()
    .then(() => {
      return post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
    })
    .then(post => {
      req.flash('success', 'Comment deleted!')
      return res.redirect('back');
    });
  } else {
    req.flash('error', err);
    return res.redirect('back');
  }
})

}
 

