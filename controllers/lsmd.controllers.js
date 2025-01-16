const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")
const authen = require('../config/authorization');

async function MongoGetMetadata(schema_key, item_id) {
    const db = await mongoCon.EstablishConnection()
    var s = schema_key + '_id'
    c = schema_key + "s"
    var filter = {}
    filter[s] = Number(item_id)
    const findResult = await db.collection(c).findOne(filter)
    return findResult;
}

async function MongoAddMetadataItem(schema_key, item_id, item_key, item_value) {
    const db = await mongoCon.EstablishConnection()
    var obj = {}
    obj[item_key] = item_value
    var newvalues = { $set: obj };
    var s = schema_key + '_id'
    c = schema_key + "s"
    var filter = {}
    filter[s] = Number(item_id)
    const findResult = await db.collection(c).updateOne(filter, newvalues, function (err, resData) {
        return resData;
    })
    return findResult;
}

async function MongoDeleteMetadataItem(schema_key, item_id, item_key, item_value) {
    const db = await mongoCon.EstablishConnection()
    var obj = {}
    obj[item_key] = item_value
    var delObj = { $unset: obj };
    var s = schema_key + '_id'
    c = schema_key + "s"
    var filter = {}
    filter[s] = Number(item_id)
    const findResult = await db.collection(c).updateOne(filter, delObj, function (err, resData) {
        return resData;
    })
    return findResult;
}


async function MongoGetRecommendedMetadata(schema_key, item_id) {
    const db = await mongoCon.EstablishConnection()
    var s = schema_key + '_id'
    c = schema_key + "s"
    var filter = {}
    filter[s] = Number(item_id)
    const findResult = await db.collection(c).findOne(filter)
    return findResult;
}


async function MongoCreateRecommendedMetadata(schema_key, item_id) {
    const db = await mongoCon.EstablishConnection()
    var newRMDSchema =
    {
        schema_title: "sample",
        schema_version: "v1.0",
        schema_description: "The recommended metadata items by the DAPHNE4NFDI community.",
        required: [],
        properties: []
    };

    const AddResult = await db.collection("recommended_metadata").insertOne(newRMDSchema, function (err, ress) {
        return ress;
    })
    return AddResult;
}
async function MongoPushRecommendedMetadataItem(schema_key, schema_version, new_item) {
    console.log(new_item);
    const db = await mongoCon.EstablishConnection()
    var newItem = { $push: { properties: new_item } };
    var mangoquery = { "schema_title": schema_key, "schema_version": schema_version };
    const findResult = await db.collection("recommended_metadata").updateOne(mangoquery, newItem, function (err, resData) {
        return resData;
    })
    return findResult;
}

// ============================== Main Functions ==============================



function GetMDByItemId(req, res) {
    try {
        MongoGetMetadata(req.headers.schema_key, req.headers.item_id)
            .then(md => {
                res.status(200)
                return res.json(md)
            })


    }
    catch (error) {
        return res.json(error);
    }
}

function AddMDItem(req, res) {
    try {
        MongoAddMetadataItem(req.body.schema_key, req.headers.item_id, req.body.key, req.body.value)
            .then(md => {
                res.status(200)
                return res.json(md)
            })


    }
    catch (error) {
        return res.json(error);
    }
}

function DeleteMDItem(req, res) {
    try {
        MongoDeleteMetadataItem(req.body.schema_key, req.headers.item_id, req.body.key, req.body.value)
            .then(md => {
                res.status(200)
                return res.json(md)
            })


    }
    catch (error) {
        return res.json(error);
    }
}


function GetRecommendedMD(req, res) {

}

function CreateRecommendedMD(req, res) {
    if (req.headers.token === "317db886-f583-4050-8f85-16650bcdba21") {
        try {
            MongoCreateRecommendedMetadata()
                .then(md => {
                    res.status(200)
                    return res.json(md)
                })


        }
        catch (error) {
            return res.json(error);
        }
    } else {
        res.status(405)

        return res.json("not allowed");
    }

}


function AddRecommendedMDItem(req, res) {
    if (req.headers.token === "317db886-f583-4050-8f85-16650bcdba21") {
        try {
            console.log(req.body.new_item);

            MongoPushRecommendedMetadataItem("sample", "v1.0", req.body.new_item)
                .then(md => {
                    res.status(200)
                    return res.json(md)
                })
        }
        catch (error) {
            return res.json(error);
        }
    } else {
        res.status(405)
        return res.json("not allowed");
    }

}



module.exports =
{
    GetMDByItemId,
    AddMDItem,
    DeleteMDItem,
    CreateRecommendedMD,
    AddRecommendedMDItem
};