const express = require('express');
const router = express.Router();
const botCtrl = require('../controllers/bot.controllers');


router.post('/bot/msg', botCtrl.SendMSG);
router.get('/llms/models/getmodelslist', botCtrl.getModelsList);
module.exports = router;