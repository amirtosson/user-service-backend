const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")
const authen = require('../config/authorization');

async function MongoGetMetadata(schema_key, item_id) {
    const db = await mongoCon.EstablishConnection()
    var s = schema_key +'_id'
    c= schema_key +"s"
    var filter = {}
    filter[s]= Number(item_id)
    const findResult = await db.collection(c).findOne(filter)
    return findResult;
}

async function MongoAddMetadataItem(schema_key, item_id, item_key, item_value) {
    const db = await mongoCon.EstablishConnection()
    var obj = {}
    obj[item_key]= item_value
    var newvalues = { $set: obj};
    var s = schema_key +'_id'
    c= schema_key +"s"
    var filter = {}
    filter[s]= Number(item_id)
    const findResult =  await db.collection(c).updateOne(filter, newvalues,function(err, resData) {
        return resData;
    })
    return findResult;
}

async function MongoDeleteMetadataItem(schema_key, item_id, item_key, item_value) {
    const db = await mongoCon.EstablishConnection()
    var obj = {}
    obj[item_key]= item_value
    var delObj = { $unset: obj};
    var s = schema_key +'_id'
    c= schema_key +"s"
    var filter = {}
    filter[s]= Number(item_id)
    const findResult =  await db.collection(c).updateOne(filter, delObj,function(err, resData) {
        return resData;
    })
    return findResult;
}

// ============================== Main Functions ==============================



function GetMDByItemId(req,res) {             
    try 
    {
        MongoGetMetadata(req.headers.schema_key, req.headers.item_id)
        .then(md => {
            res.status(200)
            return res.json(md)
        })

           
    }
    catch (error) 
    {   
        con.end()
        return res.json(error);
    }
}

function AddMDItem(req,res) {             
    try 
    {  
         MongoAddMetadataItem(req.body.schema_key, req.headers.item_id, req.body.key, req.body.value )
         .then(md => {
             res.status(200)
             return res.json(md)
         })

           
    }
    catch (error) 
    {   
        con.end()
        return res.json(error);
    }
}

function DeleteMDItem(req,res) {             
    try 
    {
         MongoDeleteMetadataItem(req.body.schema_key, req.headers.item_id, req.body.key, req.body.value )
         .then(md => {
             res.status(200)
             return res.json(md)
         })

           
    }
    catch (error) 
    {   
        con.end()
        return res.json(error);
    }
}


module.exports = 
{ 
    GetMDByItemId, 
    AddMDItem,
    DeleteMDItem
};