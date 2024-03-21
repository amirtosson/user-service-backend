const express = require('express');
const router = express.Router();
const lsmdCtrl = require('../controllers/lsmd.controllers');

router.get('/lsmd/getmdbyid', lsmdCtrl.GetMDByItemId);
router.post('/lsmd/addmditembyid', lsmdCtrl.AddMDItem);
router.delete('/lsmd/deletemditembyid', lsmdCtrl.DeleteMDItem);

router.post('/lsmd/schemas/recommended/create', lsmdCtrl.CreateRecommendedMD);
router.post('/lsmd/schemas/recommended/additem', lsmdCtrl.AddRecommendedMDItem);



module.exports = router;