const express = require('express');
const router = express.Router();
const gCtrl = require('../controllers/general.controlleres');

router.get('/general/validators/nameavailability', gCtrl.CheckUsernameAvailability);
router.get('/general/getter/faciltieslist', gCtrl.GetFacilitiesList);
router.get('/general/getter/methodslist', gCtrl.GetMethodsList);
module.exports = router;