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

        res.redirect('/');
      })
      .catch(error =>{
        console.log('error in comments',error)
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
      return res.redirect('back');
    });
  } else {
    return res.redirect('back');
  }
})

}
 

