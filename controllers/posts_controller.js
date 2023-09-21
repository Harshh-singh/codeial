const post = require('../models/post');
const comment = require('../models/comment');

module.exports.create =  async function(req,res){
    try{
   await post.create({
        content: req.body.content,
        user: req.user._id
    })
    return res.redirect('back');
}
        
    catch(err){
        console.log('error in creating post', err);
        return;
    };
}

module.exports.destroy = function(req,res){
    
    post.findById(req.params.id)
    .then(post =>{
        if(post.user == req.user.id){
            post.deleteOne()
            .then(() =>{
                return  comment.deleteMany({
                    post: req.params.id 
                 })
            .then(() =>{
                return res.redirect('back');
            })
                         
            });
        }
        else{
            return res.redirect('back');
        }
    })

}