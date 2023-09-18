const express = require('express');
const router = express.Router();
const passport = require('passport');

const usercontroller = require('../controllers/users_controller');
// const userposts = require('../controllers/posts_controller');

//when request comes as user profile
router.get('/profile' , passport.checkAuthentication, usercontroller.profile);

// when request comes as user posts
// router.get('/posts' , userposts.posts);

//request for sign in page
router.get('/signin' , usercontroller.signin);

//request for sign up page
router.get('/signup', usercontroller.signup);


router.post('/create',usercontroller.create);

// router.post('/createSession', usercontroller.createSession);

//use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signup'},
), usercontroller.createSession);

router.get('/signout', usercontroller.destroySession);

module.exports = router;