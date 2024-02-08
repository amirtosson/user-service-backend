const express = require('express');
const router = express.Router();
const diCtrl = require('../controllers/dataset-instances.controllers');

router.get('/datasetinstances/getdatasetinstanceslistlinkedexp', diCtrl.GetDatasetInstancesByUserIdAndExperimentId);
router.get('/datasetinstances/getdatasetinstanceslist', diCtrl.GetDatasetInstancesByUserId);


//router.post('/experiments/create', expCtrl.CreateExperiment);
//router.post('/experiments/updateexperiment', expCtrl.UpdateExperimentById);
//router.post('/experiments/deleteexperiment', expCtrl.DeleteExperimentById);

module.exports = router;