const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")
const authen = require('../config/authorization')

let sessionId = ""

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


async function MongoGetRecommendedMetadata(schema_key, item_id) {
    const db = await mongoCon.EstablishConnection()
    var s = schema_key +'_id'
    c= schema_key +"s"
    var filter = {}
    filter[s]= Number(item_id)
    const findResult = await db.collection(c).findOne(filter)
    return findResult;
}

async function MongoGetRecommendedMetadataSchemas() {
    const db = await mongoCon.EstablishConnection()
    const findResult = await db.collection("recommended_metadata").find().toArray()
    return findResult;
}


async function MongoCreateRecommendedMetadataSchema(schema_name, schema_version,schema_description) {
    const db = await mongoCon.EstablishConnection()
    var newRMDSchema =
    {
        schema_title: schema_name,
        schema_version:schema_version,
        schema_description:schema_description,
        required: [],
        properties :[]
    };

    const AddResult = await db.collection("recommended_metadata").insertOne(newRMDSchema, function (err, ress) {
        return ress;
    })
    return AddResult;
}
async function MongoPushRecommendedMetadataItem(schema_key, schema_version, new_item){
    console.log(new_item);
    const db = await mongoCon.EstablishConnection()
    var newItem = { $push: {properties:new_item}};
    var mangoquery = {"schema_title":schema_key, "schema_version":schema_version};
    const findResult =  await db.collection("recommended_metadata").updateOne(mangoquery, newItem,function(err, resData) {
        return resData;
    })
    return findResult;
}

// ============================== Main Functions ==============================



function GetRecommendedMDSchemas(req,res) {

    console.log(req.headers.token);
    console.log(req.headers.session_id)
    console.log(sessionId);
    try 
    {
        MongoGetRecommendedMetadataSchemas()
        .then(md => {
            res.status(200)
            return res.json(md)
        })
        
    }
    catch (error) 
    {   
        return res.json(error);
    } 

}

function AuthenticateUser(req,res) {
    if (req.headers.token) {
        sessionId = authen.GenerateNewToken(req.headers.token)
        var query = "SELECT user_name FROM metadata_tool_users WHERE user_token = '" +req.headers.token + "'"
        try 
        {
            var con = dbCon.handleDisconnect()
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    con.end()
                    return res.json(-1004);
                }
                if (result[0] === undefined ) {
                    con.end()
                    res.status(200)
                    return res.json(-1004);
                } 
                else {
                    con.end()
                    res.status(200)
                    return res.json
                    (
                        {
                            "routing_link":"metadatatool/"+result[0].user_name,
                            "session_id": sessionId
                        }
                    )
                }
            })
        }
        catch (error) 
        {   
            con.end()
            return res.json(error);
        }
    } else {
        res.status(404)
        return res.json(-1003);
    }
}


function CreateRecommendedMD(req,res) {

    if (req.headers.token === "317db886-f583-4050-8f85-16650bcdba21") {
        try 
        {
            if (!req.body.schema_title || !req.body.schema_version || !req.body.schema_description ) {
                res.status(404)
                return res.json(-1003) 
            }

            MongoCreateRecommendedMetadataSchema(req.body.schema_title, req.body.schema_version,req.body.schema_description)
            .then(md => {
                res.status(200)
                return res.json(md.acknowledged)
            })

            
        }
        catch (error) 
        {   
            return res.json(error);
        } 
    } else {
        res.status(405)

        return res.json("not allowed");
    }
    
}


function AddRecommendedMDItem(req,res) {
    if (req.headers.token === "317db886-f583-4050-8f85-16650bcdba21") 
    {
        try 
        {
            console.log(req.body.new_item);
            
            MongoPushRecommendedMetadataItem(req.headers.schema_title,req.headers.schema_version, req.body.new_item)
            .then(md => {
                res.status(200)
                 return res.json(md)
             })
        }
        catch (error) 
        {   
            return res.json(error);
        } 
    } else {
        res.status(405)
        return res.json("not allowed");
    }
    
}



module.exports = 
{ 
    AuthenticateUser,
    CreateRecommendedMD,
    AddRecommendedMDItem,
    GetRecommendedMDSchemas
};