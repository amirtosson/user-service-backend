const dbCon = require("../config/db-connections")


function CreateExperimentToSampleLink(req,res) {
    var query = "INSERT INTO link_exp_samples(link_exp_id, link_exp_name, link_sample_id, link_sample_name)"
    + " VALUES(?,?,?,?)"
    var values =[req.body.link_exp_id, req.body.link_exp_name, req.body.link_sample_id, req.body.link_sample_name]
    try 
    {
        var con = dbCon.handleDisconnect()
        con.query(query, values,function (err, result) {
            if (err) {
                console.log(err)
                con.end()
                return res.json(err);
            }
            if (result === undefined ) {
                con.end()
                res.status(200)
                return res.json(-1003);
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



module.exports = 
{ 
    CreateExperimentToSampleLink, 
}