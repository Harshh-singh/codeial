const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/home_controller');

console.log('router loaded');


router.get('/' , homecontroller.home);

//when any user request comes it shifts control to users route
router.use('/users' , require('./users'));

module.exports = router;