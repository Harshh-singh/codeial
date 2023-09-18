const post = require('../models/post');

module.exports.home = async function(req,res){

    // try {
    //     const posts = await post.find({});
    //     res.render('home', {
    //       title: 'Home',
    //       posts: posts
    //     });
    //   } catch (err) {
    //     // Handle any errors here
    //     console.log('error');

    //   }
    post.find({})
    .populate('user')
    .exec()
    .then(posts => {
      res.render('home', {
        title: 'Home',
        posts: posts
      });
    })
    .catch(err => {
     console.log('error in finding user');
    });
  
      
    
      
    
}


