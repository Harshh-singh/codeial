const User = require('../models/user');



module.exports.profile = async function(req , res){
  if(req.cookies.user_id){
    try {
      let user = await User.findById(req.cookies.user_id);
      if(user){
        return res.render('user_profile' , {
          title: 'user profile',
          user:user
        })
      }
    } catch(err) {
      console.log('error in finding user by id', err);
    }
  } else {
    return res.redirect('/user/signin');
  }
}


module.exports.signin = function(req,res){
   return res.render ('user_sign_in', {
        title: 'sign-in',
   })
}

module.exports.signup = function(req,res){
    return res.render('user_sign_up', {
        title: 'sign-up',
    })
}

//get the sign up data

module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }
  
    try {
      let user = await User.findOne({email: req.body.email});
      if(!user){
        await User.create(req.body);
        return res.redirect('/users/signin');
      } else {
        return res.redirect('back');
      }
    } catch(err) {
      console.log('error in finding or creating user', err);
    }
  }
  

//get sign in data and create session
module.exports.createSession = async function(req,res){
  //find the user
  try {
    let user = await User.findOne({email: req.body.email});
    //handle user found
    if(user){
      //handle password doesn't match
      if(user.password!=req.body.password){
        return res.redirect('back');
      }
      //handle session creation
      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
    } else {
      //handle user not found
      return res.redirect('/users/signup');
    }
  } catch(err) {
    console.log('error in finding user in signing in', err);
  }
}
