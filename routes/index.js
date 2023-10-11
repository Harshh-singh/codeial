const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/home_controller');

console.log('router loaded');


router.get('/' , homecontroller.home);

//when any user request comes it shifts control to users route
router.use('/users' , require('./users'));

//when any posts request comes it shift control to post route
router.use('/post', require('./post'));

//when any req comes related to comments it shifts control to comments route
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

router.use('/likes', require('./likes'));

module.exports = router;