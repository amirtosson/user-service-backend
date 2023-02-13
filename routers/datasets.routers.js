
const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const PATH_RAW = '/home/tosson/Desktop/Projects/datasets/rawdatasets/';
const datasetCtrl = require('../controllers/datasets.controllers');

router.post('/uploadfile', datasetCtrl.uploadS3.single('file'), datasetCtrl.UploadSingleFile);
// router.post('/saveattach', upload_attach.single('file'), datasetCtrl.SaveAttachedFile);
// router.get('/getattachedfilesbydoi', datasetCtrl.GetAttachedFilesByDatasetDoi);

router.post('/addmetadataitem', datasetCtrl.AddMetadataItem);
router.get('/getmetadatabydoi', datasetCtrl.GetMetadataByDatasetDoi);
// router.get('/getdatasetactivites', datasetCtrl.GetDatasetActivitiesByDoi);
// router.post('/insertdatasetactivity', datasetCtrl.AddDatasetActivity);
router.get('/getdatasetsbyuserid', datasetCtrl.GetDatasetsByUserId);
module.exports = router;