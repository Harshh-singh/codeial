const express = require('express');
const router = express.Router();
const passport = require('passport');

const usercontroller = require('../controllers/users_controller');
// const userposts = require('../controllers/posts_controller');

//when request comes as user profile
router.get('/profile/:id' , passport.checkAuthentication, usercontroller.profile);
router.post('/update/:id' , passport.checkAuthentication, usercontroller.update);


//request for sign in page

router.get('/signin' , usercontroller.signin);

//request for sign up page
router.get('/signup', usercontroller.signup);


router.post('/create',usercontroller.create);

// router.post('/createSession', usercontroller.createSession);

//use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), usercontroller.createSession);

router.get('/signout', usercontroller.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}),usercontroller.createSession);

module.exports = router;