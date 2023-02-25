
const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const PATH_RAW = '/home/tosson/Desktop/Projects/datasets/rawdatasets/';
const datasetCtrl = require('../controllers/datasets.controllers');
router.post('/uploadfile', datasetCtrl.uploadS3.single('file'), datasetCtrl.UploadSingleFile);
router.post('/addfiletodatabases', datasetCtrl.AddFileToDatabases);

router.post('/savelabbook', datasetCtrl.SaveLabBook);
router.get('/getlabbook', datasetCtrl.GetLabBook);
// router.post('/saveattach', upload_attach.single('file'), datasetCtrl.SaveAttachedFile);
// router.get('/getattachedfilesbydoi', datasetCtrl.GetAttachedFilesByDatasetDoi);
router.post('/deletedatasetbydoi', datasetCtrl.DeleteDatasetByDOI);
router.post('/addmetadataitem', datasetCtrl.AddMetadataItem);
router.get('/getmetadatabydoi', datasetCtrl.GetMetadataByDatasetDoi);
// router.get('/getdatasetactivites', datasetCtrl.GetDatasetActivitiesByDoi);
// router.post('/insertdatasetactivity', datasetCtrl.AddDatasetActivity);
router.post('/deletemetadataitem', datasetCtrl.DeleteMetadataByDatasetDoi);
router.post('/editmetadataitem', datasetCtrl.EditMetadataByDatasetDoi);
router.get('/getdatasetsbyuserid', datasetCtrl.GetDatasetsByUserId);
module.exports = router;