const express = require('express');
const router = express.Router();
const linkCtrl = require('../controllers/linking-objects.controlleres');


router.post('/linking/create/exptosample', linkCtrl.CreateExperimentToSampleLink);
router.post('/linking/create/exptoinstance', linkCtrl.CreateExperimentToDatasetInstanceLink);
router.post('/linking/create/instancetofile', linkCtrl.CreateDatasetInstanceToFataFileLink);

module.exports = router;