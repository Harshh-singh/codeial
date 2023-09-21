const User = require('../models/user');


module.exports.profile = async function(req, res) {
  User.findById(req.params.id)
    .then(user => {
      return res.render('user_profile', {
        title: 'user profile',
        profile_user: user,
      });
    })
    .catch(err => {
      console.error(err); // Handle the error appropriately
      // You might want to render an error page or redirect to another page here
    });
}

module.exports.update = function(req,res){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body)
     .then(user =>{
      return res.redirect('back');
    });
  }else{
    return res.status(401).send('Unauthorized');
  }
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
  req.flash('success', 'Logged in successfully');
  return res.redirect('/'); 

}

module.exports.destroySession = function(req, res){
  req.logout(function(err){
    if(err){
      console.log('error in signing out', err);
    }
  });
  req.flash('success', 'You have logged out!');

  return res.redirect('/');
}