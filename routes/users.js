const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/users_controller');
const userposts = require('../controllers/posts_controller');

//when request comes as user profile
router.get('/profile' , usercontroller.profile);

// when request comes as user posts
router.get('/posts' , userposts.posts);

module.exports = router;