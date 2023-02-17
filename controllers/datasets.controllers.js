const mysql = require('mysql2');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const doi = require('../config/doi')
const mongodb = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

//var mongodb = require('mongodb').MongoClient;
//const fs = require('fs');
//var glob = require("glob");
//const { all } = require('../routers/user.routers');

var mongoUrl = "mongodb://localhost:27017/";
const client = new MongoClient(mongoUrl);
const dbName = 'daphne';



// ======================MongoDB functions ========================
async function MongoAddDataset(dataset_doi, dataset_name) {
    await client.connect();
    const db = client.db(dbName);
    var myobj = { dataset_doi: dataset_doi, dataset_name: dataset_name};

    const AddResult =  await db.collection("datasets_metadata").insertOne(myobj, function(err, res) {
        console.log(res)
        return res;
    })
    return AddResult;
  }

async function MongoGetMetadataByDatasetDoi(dataset_doi) {
    await client.connect();
    const db = client.db(dbName);
    var mangoquery = {"dataset_doi":dataset_doi};
    const findResult =  await db.collection("datasets_metadata").find(mangoquery).toArray(function(err, resData) {
        return resData;
    })
    return findResult;
}

async function MongoDeletedataByDatasetDoi(dataset_doi) {
    await client.connect();
    const db = client.db(dbName);
    var mangoquery = {"dataset_doi":dataset_doi};
    const deleteResult =  await db.collection("datasets_metadata").deleteOne(mangoquery, function(err, resData) {
        return resData;
    })
    return deleteResult;
}


async function MongoAddMetadataItem(item_name, item_value, dataset_doi) {
    await client.connect();
    const db = client.db(dbName);
    var obj = {}
    obj[item_name]= item_value
    var newvalues = { $set: obj};
    var mangoquery = {"dataset_doi":dataset_doi};
    const findResult =  await db.collection("datasets_metadata").updateOne(mangoquery, newvalues,function(err, resData) {
        return resData;
    })
    return findResult;
}

// ========================= AWS-bucket Config and function ====================================
const s3 = new AWS.S3({
    accessKeyId: "AKIA6ENB2UFPJAG7WPEL",
    secretAccessKey: "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",
    region:"eu-central-1"
  });
  
let AWSBucketStorage = multerS3({
    acl: 'public-read',
    s3,
    bucket: 'daphne-angular',
    key: function(req, file, cb) {
        newDOI = doi.GenerateNewDatasetDOI(file.originalname)
        const names= file.originalname.split('+')
        file.filename  = names[names.length -1];
        cb(null,names[names.length -1]);
     }
    })

// ============================== Mysql config and connection handling ==============================
const db_config = {
    host:"daphnemysqldb.c9zdqm1tdnav.eu-central-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password: "26472647",
    database: "daphne"
  };


var con;
function handleDisconnect() 
{
    con = mysql.createConnection(db_config);
    con.connect(function(err) 
    {            
        if(err) {                                  
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); 
        }                                     
    });                                     
    con.on('error', function(err) 
    {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect();                        
        } else {                                      
            throw err;                                 
        }
    });
 }

//handleDisconnect();

// ====================================== Main APIS========================================

function GetDatasetsByUserId(req,res) {
    var query = "SELECT dataset_id, owner_id, login_name , dataset_name, datasets_filename, method_name, structure_name, project_name, added_on, dataset_doi, dataset_pid FROM daphne.datasets_list "+
    " INNER JOIN methods_list ON datasets_list.method_id = methods_list.method_id" +
    " INNER JOIN users ON users.user_id = datasets_list.owner_id " +
    " INNER JOIN data_structures_list ON datasets_list.dataset_structure_id = data_structures_list.structure_id" + 
    " INNER JOIN projects_list ON datasets_list.project_id = projects_list.project_id" + 
    " WHERE owner_id = " +req.headers.user_id +
    " OR dataset_visibilty_id = 1;";
    try 
    {
        handleDisconnect();
        con.query(query, function (err, result) {
            if (err) throw err;
            if (result[0] === undefined ) {
                con.end()
                res.status(404)
                return res.json(
                    { 
                        "error": 'No Datasets'  
                    }
                );
            } 
            else {
                con.end()
                return res.json(result)
            }
        })
    }
    catch (error) 
    {   
        con.end()
        console.log(error)
        return res.json(error);
    }
}

const uploadS3 = multer({ storage: AWSBucketStorage })

function UploadSingleFile(req,res, next) 
{
    const file = req.file;
    const name_parts = file.originalname.split('+')
    var PID = ""
    var DOI = doi.GenerateNewDatasetDOI(file.originalname)
    var params = {
        Bucket: 'daphne-angular',
        Key:file.filename
      };
    s3.getSignedUrl('putObject', params, function (err, url) {
    PID = url.split('?')[0]
    var query = "INSERT INTO datasets_list(owner_id, dataset_structure_id, method_id, project_id , dataset_name, dataset_visibilty_id , datasets_filename, dataset_pid, dataset_doi,added_on) VALUES("
    + name_parts[1] +  ","
    + "\""+name_parts[2]+  "\""+ ","
    + "\""+name_parts[3]+  "\""+ ","
    + "\"" +name_parts[4]+ "\""+ ","
    + "\"" +name_parts[5]+ "\""+ "," 
    + "\"" +name_parts[6]+ "\""+ "," 
    + "\"" +file.filename+ "\""+ "," 
    + "\"" +PID+ "\""+ "," 
    + "\"" +DOI+ "\""+ "," 
    + "now());"
    try 
    {
        handleDisconnect();
        con.query(query, function (err, result, fields) 
        {
            if (err) {
                return res.status(400);
            }
            MongoAddDataset(DOI, name_parts[5])
            .then(resu=>{
                con.end()
                res.status(200);
                return res.json(resu);
            })            
            });
    } catch (e) 
    { 
        return res.json("Something Wrong");   
    }
    });
    return res.status(200);
}

function GetMetadataByDatasetDoi(req,res){
    
    MongoGetMetadataByDatasetDoi(req.headers.dataset_doi)
    .then(resu =>{
        res.status(200)
        return res.json(resu[0])
    }) 
 }

function AddMetadataItem(req,res){
    MongoAddMetadataItem(req.body.key,req.body.value, req.headers.dataset_doi)
    .then(
        resu =>{
            res.status(200)
            return res.json(resu)
        }
    )
 }
    
function DeleteDatasetByDOI(req, res) {
    var query = "DELETE FROM datasets_list WHERE dataset_doi = "+ "\""+req.body.dataset_doi+ "\"" + ";"
    try 
    {

        var params = 
        {
            Bucket:  'daphne-angular',
            Key: req.body.original_file_name
        };
                      
        s3.deleteObject(params, function(err, data) {
            if (err) 
            {                    
                res.status(400);
                return res.json(err.stack) 
            } 


            // handleDisconnect();
            // con.query(query, function (err, result, fields) 
            // {
            //     if (err) {
            //         return res.json(err);
            //     }
            //     MongoDeletedataByDatasetDoi(req.body.dataset_doi)
            //     .then
            //     (
            //         resu=>
            //         {
            //             con.end()
            //             if (resu.deletedCount > 0)
            //             {
            //                 res.status(200);
            //                 return res.json(data);
            //             }
            //             res.status(400);
            //             return res.json("Something wrong")                        
            //     })
            // })
        })
            
    } catch (e) 
    { 
        return res.json("Something Wrong");   
    }
    return res.status(200);
}

    //  mongodb.connect(mongoUrl, function(err, db) {
    //      if (err) throw err;
    //      var dbo = db.db("daphne");
    //      var myobj = { dataset_doi: newDoi, dataset_name: name_parts[5]};
    //      dbo.collection("datasets_metadata").insertOne(myobj, function(err, res) {
    //        if (err) throw err;
    //        db.close();
    //      });
    //    });
    //  res.json(newDoi);


 // function GetMetadataByDatasetDoi(req,res){
//     mongodb.connect(mongoUrl, function(err, db) 
//     {
//         if (err) throw err;
//         var dbo = db.db("daphne");
//         var query = { dataset_doi: req.headers.dataset_doi };
//         dbo.collection("datasets_metadata").findOne(query, function(err, result) {
//           if (err) throw err;
//           db.close();
//           res.json(result)
//         });
//     });
// }


// var attaced_file = {
//     added_by : "",
//     file_type : -1,
//     added_on :  "",
//     file_data:""
// }

// function GetDataFeomFiles(path) {
//     var all_data = []
//     // glob(path,options, function (er, files, next) {
//     //     // var query = "SELECT * FROM  attached_files_list"+ 
//     //     // " INNER JOIN users ON users.user_id = attached_files_list.added_by " +
//     //     // " WHERE attached_files_list.dataset_doi = " +"\""+req.headers.dataset_doi + "\""+ ";" 
//     //     // console.log(query)
//     //     files.forEach((file)=>{
//     //         fs.readFile(PATH_ATTACHED+file, {encoding: 'utf-8'}, function(err,data){
//     //             all_data.push(data)
//     //         })
//     //     })

//     // })
//     // console.log(all_data)
//     // return all_data
// }


// function GetAttachedFilesByDatasetDoi(req,res){
//     var query = "SELECT added_on, login_name, attached_file_name, added_on, added_by, attached_file_type_id  FROM  attached_files_list"+ 
//     " INNER JOIN users ON users.user_id = attached_files_list.added_by " +
//     " WHERE attached_files_list.dataset_doi = " +"\""+req.headers.dataset_doi + "\""+ ";" 
    
//     try {
//         con.query(query, function (err, result, fields) {
//             if (err) {
//                 console.log(err)
//             }
//             res.json(result);
//             });
//     } catch (e) { 
//         console.log(e)
//         res.json("Something Wrong");
//         return res.status(400);
//     }
//     //GetDataFeomFiles(req.headers.dataset_doi+'_atta_*')

    
    
//     //return res.send( a)  

       
  


//     //console.log(all_data)
 
// }

// function SaveAttachedFile(req,res, next) {
//     const file = req.file;
//     if (!file) {
//       const error = new Error('No File')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//     const name_parts = file.originalname.split('_')
//     var query = "INSERT INTO attached_files_list(dataset_doi, added_by, attached_file_type_id, attached_file_name, added_on) VALUES("
//     + "\""+name_parts[0]+  "\""+","
//     + name_parts[2]+  ","
//     + name_parts[3]+ ","
//     + "\"" +name_parts[4]+ "\""+ ","
//     + "now());"
//     try {
//         con.query(query, function (err, result, fields) {
//             if (err) {
//                 console.log(err)
//                 res.json(err)
//             }
//             res.status(200);
//             res.json(result)
//             });
//     } catch (e) { 
//         console.log(e)
//         res.json("Something Wrong");
//         return res.status(400);
//     }
// }



// function GetMetadataByDatasetDoi(req,res){
//     mongodb.connect(mongoUrl, function(err, db) 
//     {
//         if (err) throw err;
//         var dbo = db.db("daphne");
//         var query = { dataset_doi: req.headers.dataset_doi };
//         dbo.collection("datasets_metadata").findOne(query, function(err, result) {
//           if (err) throw err;
//           db.close();
//           res.json(result)
//         });
//     });
// }

// function AddMetadataItem(req,res){
//     mongodb.connect(mongoUrl, function(err, db) 
//     {
//         if (err) throw err;
//         var dbo = db.db("daphne");
//         var query = { dataset_doi: req.headers.dataset_doi };
//         var val = req.body.value
//         var keyN = req.body.key
//         var obj = {}
//         obj[keyN]= val
//         var newvalues = { $set: obj};
//         dbo.collection("datasets_metadata").updateOne(query, newvalues, function(err, result) {
//           if (err) throw err;
//           db.close();
//           res.json(result)
//         });
//     });
// }

// function GetDatasetActivitiesByDoi(req,res)
// {
//     var query = "SELECT login_name, activity, created_on FROM datasets_activities_list "+ 
//     "INNER JOIN users ON users.user_id = datasets_activities_list.created_by " +
//     "WHERE datasets_activities_list.dataset_doi = " +"\""+req.headers.dataset_doi + "\""+ ";" 
//     try 
//     {
//         con.query(query, function (err, result) {
//             if (err) throw err;
//             if (result[0] === undefined ) {
//                 res.status(404)
//                 res.json(
//                     { 
//                         "error": 'No Activities'  
//                     }
//                 );
//             } 
//             else {
//                 res.json(result)
//             }
//         })
//     }
//     catch (error) 
//     { 
//         res.json("Something Wrong");
//     }
// }

// function AddDatasetActivity(req,res){

//     var query = "INSERT INTO datasets_activities_list(dataset_doi, activity, created_by,created_on) VALUES("
//     +"\""+req.headers.dataset_doi + "\"" + ","
//     + "\"" +req.body.activity+ "\""+ ","  
//     + req.body.created_by+ "," 
//     + "now());"
//     try 
//     {
//         con.query(query, function (err, result) {
//             if (err)
//             {
//                 res.status(404)
//                 res.json(
//                     { 
//                         "error": 'Can not created'  
//                     }
//                 );
//             } 
//             else {
//                 res.status(200)
//                 res.json(result)
//             }
//         })
//     }
//     catch (error) 
//     { 
//         res.json("Something Wrong");
//     }
// }

module.exports = 
{ 
    UploadSingleFile, 
    //SaveAttachedFile,
    DeleteDatasetByDOI,
    GetDatasetsByUserId,
    uploadS3, 
    GetMetadataByDatasetDoi, 
    AddMetadataItem, 
    //GetDatasetActivitiesByDoi, 
    //AddDatasetActivity, 
    //GetAttachedFilesByDatasetDoi
};