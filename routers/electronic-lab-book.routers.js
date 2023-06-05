
const express = require('express');
const router = express.Router();
const elnCtrl = require('../controllers/electronic-lab-book.controllers');


router.post('/createlabbook', elnCtrl.CreateExperimentLabBook);
router.get('/getlabbooklist', elnCtrl.GetLabBookListByID);
router.post('/updatelabbook', elnCtrl.UpdateLabBookListByDOI);
router.post('/updatelabbooktitle', elnCtrl.UpdateLabBookListTitleByDOI);
router.get('/getlinkeddatasetsbyelnid', elnCtrl.GetLabBookLinkedDatasetsById);


module.exports = router;