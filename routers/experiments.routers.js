const express = require('express');
const router = express.Router();
const expCtrl = require('../controllers/experiments.controllers');

router.get('/experiments/getexperimentslist', expCtrl.GetExperimentsByUserId);

router.post('/experiments/create', expCtrl.CreateExperiment);
router.post('/experiments/updateexperiment', expCtrl.UpdateExperimentById);
router.post('/experiments/deleteexperiment', expCtrl.DeleteExperimentById);

module.exports = router;