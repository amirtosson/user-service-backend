const express = require('express');
const router = express.Router();
const diCtrl = require('../controllers/dataset-instances.controllers');

router.get('/datasetinstances/getdatasetinstanceslistlinkedexp', diCtrl.GetDatasetInstancesByUserIdAndExperimentId);
router.get('/datasetinstances/getdatasetinstanceslist', diCtrl.GetDatasetInstancesByUserId);
router.get('/dataset_instances/getdataset_instancebyid', diCtrl.GetDatasetInstanceById);

router.post('/dataset_instances/create', diCtrl.CreateDatasetInstance);


//router.post('/experiments/create', expCtrl.CreateExperiment);
//router.post('/experiments/updateexperiment', expCtrl.UpdateExperimentById);
//router.post('/experiments/deleteexperiment', expCtrl.DeleteExperimentById);

module.exports = router;