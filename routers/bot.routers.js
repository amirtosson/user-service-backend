const express = require('express');
const router = express.Router();
const botCtrl = require('../controllers/bot.controllers');


router.post('/bot/msg', botCtrl.SendMSG);

module.exports = router;