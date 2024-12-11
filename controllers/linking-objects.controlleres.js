const dbCon = require("../config/db-connections")


function CreateExperimentToSampleLink(req,res) {

    var q_insersion="";
    var parent_key;
    if (req.body.link_parent == "sampletoexp") {
         parent_key = "link_sample_id"
         q_insersion = "INSERT INTO link_experiments_samples(link_sample_id, link_sample_name, link_experiment_id, link_experiment_name) VALUES"
     } else {
         parent_key = "link_experiment_id"
         q_insersion = "INSERT INTO link_experiments_samples(link_experiment_id, link_experiment_name, link_sample_id, link_sample_name) VALUES"
     }    

     var query_d ="DELETE FROM link_experiments_samples WHERE "+parent_key + " = "+req.body.link_parent_id
     var v_insersion = []
     if (req.body.link_child_id.length > 0) {

        for (let index = 0; index < req.body.link_child_id.length; index++) {
        
            const c_id = req.body.link_child_id[index]
            const c_name = req.body.link_child_name[index]
            v_insersion.push(req.body.link_parent_id)
            v_insersion.push(req.body.link_parent_name)
            v_insersion.push(c_id)
            v_insersion.push(c_name)
            q_insersion = q_insersion + "(?,?,?,?),"

         }
         q_insersion = q_insersion.slice(0,-1)
     };
     try 
     {
         var con = dbCon.handleDisconnect()
         con.query(query_d,function (err, result) {
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
                con.query(q_insersion, v_insersion, function (err_i, result_i) {
                    if (err) {
                        console.log(err_i)
                        con.end()
                        return res.json(err_i);
                    }
                    if (result_i === undefined ) {
                       con.end()
                        res.status(200)
                        return res.json(-1003);
                    } 
                    else {
                        con.end()
                        res.status(200)
                        return res.json(result_i)
                    }
                })


             }
         })
         
     }
     catch (error) 
     {   
         con.end()
         return res.json(error);
     }
}


function CreateExperimentToDatasetInstanceLink(req,res) {
    var query;
    var values;
    if (req.body.link_parent =='exptoinstance') {

        if (req.body.link_child_id.length>0) {
            query = "UPDATE dataset_instances_list SET dataset_instance_linked_experiment_id = ? WHERE dataset_instance_id IN ("
            for (let index = 0; index <req.body.link_child_id.length; index++) {
                const element = req.body.link_child_id[index];
                query = query + element +","
            }
            query = query.slice(0,-1) + ")"
            
        }
        else{
            query = "UPDATE dataset_instances_list SET dataset_instance_linked_experiment_id = -1 WHERE dataset_instance_linked_experiment_id =?" 
        }
        values = [ req.body.link_parent_id]
       
        
    } else {
        query = "UPDATE dataset_instances_list SET dataset_instance_linked_experiment_id = ? WHERE dataset_instance_id = ?"
        values = [req.body.link_child_id[0], req.body.link_parent_id]
    }

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

function CreateDatasetInstanceToFataFileLink(req,res) {
    var query = "UPDATE data_files_list SET data_file_linked_dataset_instance_id = ?, data_file_linked_experiment_id = "+ 
    "(SELECT dataset_instances_list.dataset_instance_linked_experiment_id FROM daphne.dataset_instances_list WHERE dataset_instances_list.dataset_instance_id = ?)" +
    " WHERE data_files_list.data_file_id = ?"
    var values = req.body.link_parent =='instancetofile' ? [req.body.link_parent_id, req.body.link_parent_id, req.body.link_child_id[0]]:[req.body.link_child_id[0], req.body.link_child_id[0], req.body.link_parent_id]
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


module.exports = 
{ 
    CreateExperimentToSampleLink,
    CreateExperimentToDatasetInstanceLink,
    CreateDatasetInstanceToFataFileLink 
}