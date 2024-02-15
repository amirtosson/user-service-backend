const express = require('express');
const router = express.Router();
const lsmdCtrl = require('../controllers/lsmd.controllers');

router.get('/lsmd/getmdbyid', lsmdCtrl.GetMDByItemId);
router.post('/lsmd/addmditembyid', lsmdCtrl.AddMDItem);
router.delete('/lsmd/deletemditembyid', lsmdCtrl.DeleteMDItem);



module.exports = router;