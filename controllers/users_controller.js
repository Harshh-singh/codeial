const User = require('../models/user');


module.exports.profile = async function(req , res){
  return res.render('user_profile', {
    title: 'user profile'
  })
}


module.exports.signin = function(req,res){

  if(req.isAuthenticated()){
   return res.redirect('/users/profile')
  }

   return res.render ('user_sign_in', {
        title: 'sign-in',
   })
}

module.exports.signup = function(req,res){

  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }

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

  return res.redirect('/'); 

}

module.exports.destroySession = function(req, res){
  req.logout(function(err){
    if(err){
      console.log('error in signing out', err);
    }
  });

  return res.redirect('/');
}