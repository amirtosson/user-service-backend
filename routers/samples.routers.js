const express = require('express');
const router = express.Router();
const sampCtrl = require('../controllers/samples.controllers');

router.get('/samples/getsampleslist', sampCtrl.GetSamplesByUserId);
router.get('/samples/linkedexpgetsampleslist', sampCtrl.GetSamplesByUserId);
router.get('/samples/getsamplebyid', sampCtrl.GetSampleById);


router.post('/samples/create', sampCtrl.CreateSample);
router.post('/samples/updatesample', sampCtrl.UpdateSampleById);
router.post('/samples/deletesample', sampCtrl.DeleteSampleById);

module.exports = router;