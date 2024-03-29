const Post = require('../../../models/post');
const comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt') 
    .populate('user')
    .populate({
      path: 'comments',
      populate:{
        path: 'user',
      }
    })

    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    }) 
       
}


module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.deleteOne();
               await  comment.deleteMany({post: req.params.id });

             
               return res.status(200).json({
                     message: 'post and associated comments deleted successfully!'
                })
               
        }
        else{
           return res.status(401).json( {
            message: 'you can not delete this post!'
           })           
        }

    }

    catch(err){
        console.log('********', err);
        return res.json(500, {
            message: 'internal server error'
        });
    }
}