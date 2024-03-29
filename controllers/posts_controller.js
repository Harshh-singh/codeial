const Post = require('../models/post');
const comment = require('../models/comment');
const Like = require('../models/likes');

module.exports.create =  async function(req,res){
    try{
  let post =  await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        return res.status(200).json({
            data: {
                post: post
            },
            message: "post created!"
        });
    }
    req.flash('success', 'Post published!');
    return res.redirect('back');
}
        
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    };
}

module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.deleteOne()
               await  comment.deleteMany({
                    post: req.params.id 
                 })

                 if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "post deleted!"
                    });
                 }

                req.flash('success', 'Post deleted!')
                return res.redirect('back');
        }
        else{
            req.flash('error', err);
           return res.redirect('back');
            
        }

    }

    catch(err){
        if(err){
        console.log('error in post_controller!!');
        }
    }
}