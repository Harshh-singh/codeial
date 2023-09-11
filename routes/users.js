const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/users_controller');
const userposts = require('../controllers/posts_controller');

//when request comes as user profile
router.get('/profile' , usercontroller.profile);

// when request comes as user posts
router.get('/posts' , userposts.posts);

//request for sign in page
router.get('/signin' , usercontroller.signin);

//request for sign up page
router.get('/signup', usercontroller.signup);


router.post('/create',usercontroller.create);

router.post('/createSession', usercontroller.createSession);

module.exports = router;