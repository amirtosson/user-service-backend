const dbCon = require("../config/db-connections")


function GetFacilitiesList(req,res) {
    var query = "SELECT * FROM facility_list "
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
                return res.json(-1004
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

function GetMethodsList(req,res) {
    var query = "SELECT * FROM methods_list "
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
                        "error": 'No Methods'  
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

function CheckUsernameAvailability(req, res) {
    var query = "SELECT EXISTS(Select * FROM daphne."+req.headers.object_key+"s_list WHERE "+req.headers.object_key+"_name = ? ) As counts;"
    var values = [req.headers.object_name]
    try {
        var con = dbCon.handleDisconnect()
        con.query(query, values, function (err, result) {
            if (err) throw err;
            res.status(200)
            if (result[0].counts === 0) {
                con.end()
                return res.json(
                    {
                        "available": true
                    }
                );
            }
            else {
                con.end()
                return res.json(
                    {
                        "available": false
                    }
                );
            }
        })
    }
    catch (error) {
        con.end()
        console.log(error)
        return res.json("Something Wrong");
    }

}


module.exports = 
{ 
    CheckUsernameAvailability,
    GetFacilitiesList, 
    GetMethodsList
}