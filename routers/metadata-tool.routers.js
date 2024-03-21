const express = require('express');
const router = express.Router();
const mdtCtrl = require('../controllers/metadata-tool.controllers');

router.post('/mdt/users/authenticatation', mdtCtrl.AuthenticateUser);


router.post('/mdt/schemas/recommended/create', mdtCtrl.CreateRecommendedMD);
router.post('/mdt/schemas/recommended/additem', mdtCtrl.AddRecommendedMDItem);


router.get('/mdt/schemas/getall', mdtCtrl.GetRecommendedMDSchemas);



module.exports = router;