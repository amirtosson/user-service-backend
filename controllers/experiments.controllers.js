const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")




// ============================== Main Functions ==============================

function GetExperimentsByUserId(req,res) {
    var query = "SELECT*, GROUP_CONCAT(DISTINCT link_sample_id) as linked_samples FROM daphne.experiments_list "+
    "LEFT JOIN daphne.link_exp_samples ON link_exp_samples.link_exp_id = experiments_list.experiment_id "+
    "WHERE experiment_owner_id = "+req.headers.experiment_owner_id + " group by experiment_id"
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
                        "error": 'No Experiments found'  
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

function CreateExperiment(req,res) {
    var query = "INSERT INTO experiments_list(experiment_owner_id, experiment_name, experiment_facility_id,experiment_added_on)"
                + " VALUES(?,?,?, now())"
    var values = [req.headers.experiment_owner_id, req.body.experiment_name, req.body.experiment_facility_id]
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

function UpdateExperimentById(req,res) {
    
}

function DeleteExperimentById(req,res) {
    
}

module.exports = 
{ 
    GetExperimentsByUserId, 
    //SaveAttachedFile,
    CreateExperiment,
    UpdateExperimentById,
    DeleteExperimentById
};