const express = require('express');

const router = express.Router();
const usersapi = require('../../../controllers/api/v1/users_api');

router.post('/createsession', usersapi.createSession); 


module.exports = router;