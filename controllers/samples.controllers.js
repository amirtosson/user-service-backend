const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")
const authen = require('../config/authorization')




// ============================== Main Functions ==============================

function GetSamplesByUserId(req,res) {
    var query =     "SELECT * FROM ("+
                    "SELECT * FROM daphne.samples_list as s "+ 
                    "INNER JOIN (SELECT login_name, user_id  FROM daphne.users)  as U ON U.user_id = sample_owner_id "+  
                    "WHERE sample_owner_id = " +req.headers.sample_owner_id +
                    ") AS S"
                
    try 
    {
        var con = dbCon.handleDisconnect()
        con.query(query, function (err, result) {
            if (err) {
                console.log(err)
                con.end()
                return res.json(err);
            }
            if (result[0] === undefined ) {
                con.end()
                res.status(200)
                return res.json(
                    { 
                        "error": 'No Samples found'  
                    }
                );
            } 
            else { 
                con.end()
                res.status(200)
                return res.json(result)
            }
        })
    }
    catch (error) 
    {   
        con.end()
        return res.json(error);
    }
}

function CreateSample(req,res) {
    var query = "INSERT INTO samples_list(sample_owner_id, sample_name, sample_doi, sample_added_on)"
                + " VALUES(?,?,?, now())"
    sampleDoi = authen.GenerateRandomDOI(req.body.sample_name) 
    var values = [req.headers.sample_owner_id, req.body.sample_name, sampleDoi]
    try {
        var con = dbCon.handleDisconnect()
        con.query(query, values, function (err, result) {
            if (err) throw err;
            if (result === undefined) {
                con.end()
                res.status(404)
                return res.json(
                    {
                        "error": 'No'
                    }
                );
            }
            else {
                con.end()
                res.status(200);
                return res.json(result.insertId)
            }
        })
    }
    catch (error) {
        con.end()
        return res.json(error);
    }
}

function UpdateSampleById(req,res) {
    
}

function DeleteSampleById(req,res) {
    
}

module.exports = 
{ 
    GetSamplesByUserId, 
    //SaveAttachedFile,
    CreateSample,
    UpdateSampleById,
    DeleteSampleById
};