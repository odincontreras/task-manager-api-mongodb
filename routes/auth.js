const express = require('express');
const router = express.Router();
const formsController = require('../controllers/auth')

router.post('/signin', formsController.signin)

router.post('/login', formsController.login)

module.exports = router;