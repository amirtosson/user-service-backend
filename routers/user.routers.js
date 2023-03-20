const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');

router.post('/login', userCtrl.Login);
router.post('/signup', userCtrl.SignUp);
router.post('/checknameavailability', userCtrl.CheckUsernameAvailability);


module.exports = router;