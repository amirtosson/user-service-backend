const express = require('express');
const router = express.Router();
const linkCtrl = require('../controllers/linking-objects.controlleres');


router.post('/linking/create/exptosample', linkCtrl.CreateExperimentToSampleLink);
module.exports = router;