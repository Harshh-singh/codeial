const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/users_controller');
const userposts = require('../controllers/posts_controller');

router.get('/profile' , usercontroller.profile);

router.get('/posts' , userposts.posts);

module.exports = router;