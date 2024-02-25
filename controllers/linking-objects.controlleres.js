const dbCon = require("../config/db-connections")


function CreateExperimentToSampleLink(req,res) {

    console.log(req.body);

    var q_insersion="";
    var parent_key;
    if (req.body.link_parent == "sampletoexp") {
         parent_key = "link_sample_id"
         q_insersion = "INSERT INTO link_exp_samples(link_sample_id, link_sample_name, link_exp_id, link_exp_name) VALUES"
     } else {
         parent_key = "link_exp_id"
         q_insersion = "INSERT INTO link_exp_samples(link_exp_id, link_exp_name, link_sample_id, link_sample_name) VALUES"
     }    

     var query_d ="DELETE FROM link_exp_samples WHERE "+parent_key + " = "+req.body.link_parent_id
     
     if (req.body.link_child_id.length > 0) {

        for (let index = 0; index < req.body.link_child_id.length; index++) {
            const c_id = req.body.link_child_id[index]
            const c_name = req.body.link_child_name[index]
    
            q_insersion = q_insersion + "("+req.body.link_parent_id+", '"+req.body.link_parent_name+"', "+c_id+", '"+c_name + "'),"

         }
         q_insersion = q_insersion.slice(0,-1)
     }
     try 
     {
         var con = dbCon.handleDisconnect()
         con.query(query_d,function (err, result) {
            console.log(result)

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
                con.query(q_insersion, function (err_i, result_i) {
                    console.log(result_i)
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

    // var parent_key;
    // var parent_id;
    // if (eq.body.link_parent == "sampletoexp") {
    //     parent_key = "link_sample_id"
    //     parent_id =  req.body.link_sample_id
    // } else {
    //     parent_key = "link_exp_id"
    //     parent_id =  req.body.link_exp_id
    // }
    
    // var query = query +"DELETE FROM link_exp_samples WHERE ? = ? INSERT INTO link_exp_samples(link_exp_id, link_exp_name, link_sample_id, link_sample_name)"
    // + " VALUES(?,?,?,?)"
    // var values =[parent_key, parent_id, req.body.link_exp_id, req.body.link_exp_name, req.body.link_sample_id, req.body.link_sample_name]
    // try 
    // {
    //     var con = dbCon.handleDisconnect()
    //     con.query(query, values,function (err, result) {
    //         if (err) {
    //             console.log(err)
    //             con.end()
    //             return res.json(err);
    //         }
    //         if (result === undefined ) {
    //             con.end()
    //             res.status(200)
    //             return res.json(-1003);
    //         } 
    //         else {
    //             con.end()
    //             res.status(200)
    //             return res.json(result)
    //         }
    //     })
    // }
    // catch (error) 
    // {   
    //     con.end()
    //     return res.json(error);
    // }
}



module.exports = 
{ 
    CreateExperimentToSampleLink, 
}