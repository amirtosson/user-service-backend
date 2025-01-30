const express = require('express');
const router = express.Router();
const botCtrl = require('../controllers/bot.controllers');
const multer = require('multer');
const upload = multer({ dest: __dirname+'/uploads' });


router.post('/bot/msg', botCtrl.SendMSG);
router.get('/llms/models/getmodelslist', botCtrl.getModelsList);
router.post('/llms/models/gettextfrompdf',upload.single('file'), botCtrl.extractTextFromPDF);

module.exports = router;