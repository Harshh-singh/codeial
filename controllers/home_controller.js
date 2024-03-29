const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
  try {
    let posts = await Post.find({})
      .sort('-createdAt') 
      .populate('user')
      .populate({
        path: 'comments',
        populate:{
          path: 'user',
        },
        populate :{
          path: 'likes'
        }
      }).populate('likes');
      // .exec();

    let users = await User.find({});

    res.render('home', {
      title: 'Home',
      posts: posts ,
      all_users: users,
    });
  } catch (err) {
    console.error(err);
  }
}

