const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
//we should use try catch from next time
module.exports.create = async function(req,res){

  try{
    let post = await Post.findById(req.body.post)

    if(post){
      let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        });
        // console.log(comment);
        // post.comments.push(comment);
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user', 'name email')
        commentsMailer.newComment(comment);

        
        if(req.xhr){
        

          return res.status(200).json({
            data: {
              comment: comment
            },
            message: 'Post created!'
          });

         
        }
          
        req.flash('success', 'comment published!');
        return res.redirect(back);
    }
   
  }catch(err){
    req.flash('error', err);
    res.redirect('/');
  }
  
}

module.exports.destroy = function(req,res){
  Comment.findById(req.params.id)
.then(comment => {
  if (comment.user == req.user.id) {
    let postId = comment.post;
    comment.deleteOne()
    .then(() => {
      return Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
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
 

