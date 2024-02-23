const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")
const authen = require("../config/authorization")


async function MongoAddExperiment(experiment_id, experiment_doi) {
    const db = await mongoCon.EstablishConnection()
    var myobj = { experiment_id: experiment_id, experiment_doi:experiment_doi};

    const AddResult =  await db.collection("experiments").insertOne(myobj, function(err, res) {
        return res;
    })
    return AddResult;
  }

// ============================== Main Functions ==============================

function GetExperimentsByUserId(req,res) {
    var query = "SELECT *, GROUP_CONCAT(DISTINCT link_sample_id,'**n**',link_sample_name) as linked_samples FROM daphne.experiments_list "+
    " INNER JOIN users ON users.user_id = experiments_list.experiment_owner_id " +
    "LEFT JOIN daphne.link_exp_samples ON link_exp_samples.link_exp_id = experiments_list.experiment_id "+
    "WHERE experiment_owner_id = "+req.headers.experiment_owner_id + " group by experiment_id"
    try 
    {
        var con = dbCon.handleDisconnect()
        con.query(query, function (err, result) 
        {
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
                        "error": 'No Experiments found'  
                    }
                );
            } 
            else 
            {
                for (let index = 0; index < result.length; index++) 
                {
                    if (result[index].linked_samples ===null) continue;
                    result[index].linked_samples_names = []
                    result[index].linked_samples_ids = []
                    var ls = result[index].linked_samples.split(",")
                    for (let str_index = 0; str_index < ls.length; str_index++) 
                    {
                        const element = ls[str_index];
                        var s = element.split("**n**")
                        result[index].linked_samples_ids.push(s[0]) 
                    
                        result[index].linked_samples_names.push(s[1])
                    }
                    
                }
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

function CreateExperiment(req,res) {
    
    
    var query = "INSERT INTO experiments_list(experiment_owner_id, experiment_name, experiment_facility_id,experiment_start_date, experiment_end_date, experiment_added_on)"
                + " VALUES(?,?,?,?,?, now())"
    expDoi = authen.GenerateRandomDOI(req.body.experiment_name)
    var values = 
    [req.headers.owner_id, 
        req.body.experiment_name, 
        1,
        req.body.experiment_start_date,
        req.body.experiment_end_date]
    try {
        var con = dbCon.handleDisconnect()
        con.query(query, values, function (err, result) {
            if (err) throw err;
            if (result === undefined) {
                con.end()
                res.status(404)
                return res.json(
                    -1005
                );
            }
            else {
                MongoAddExperiment(result.insertId, expDoi)
                .then(
                    r => {
                        con.end()
                        res.status(200);
                        return res.json(result.insertId)
                    }
                )
            }
        })
    }
    catch (error) {
        console.log(error)
        con.end()
        return res.json(error);
    }
}

function UpdateExperimentById(req,res) {
    
}

function GetExperimentById(req,res) {
    var query = "SELECT experiments_list.*, users.login_name, GROUP_CONCAT(DISTINCT link_sample_id,'**n**',link_sample_name) as linked_samples FROM daphne.experiments_list "+
    " INNER JOIN users ON users.user_id = experiments_list.experiment_owner_id " +
    "LEFT JOIN daphne.link_exp_samples ON link_exp_samples.link_exp_id = experiments_list.experiment_id "+
    "WHERE experiment_id = "+req.headers.object_id + " group by experiment_id"
    try 
    {
        var con = dbCon.handleDisconnect()
        con.query(query, function (err, result) 
        {
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
                        "error": 'No Experiments found'  
                    }
                );
            } 
            else 
            {
   
                if (result[0].linked_samples){
                    result[0].linked_samples_names = []
                    result[0].linked_samples_ids = []
                    var ls = result[0].linked_samples.split(",")
                    for (let str_index = 0; str_index < ls.length; str_index++) 
                    {
                        const element = ls[str_index];
                        var s = element.split("**n**")
                        result[0].linked_samples_ids.push(s[0]) 
                    
                        result[0].linked_samples_names.push(s[1])
                    }
                
                }
                con.end()
                res.status(200)
                return res.json(result[0])
            }

        })
    }
    catch (error) 
    {   
        con.end()
        return res.json(error);
    }
}

function DeleteExperimentById(req,res) {
    
}

module.exports = 
{ 
    GetExperimentsByUserId, 
    GetExperimentById,
    CreateExperiment,
    UpdateExperimentById,
    DeleteExperimentById
};