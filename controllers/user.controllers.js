const userAuthen = require('../config/authorization')
const dbCon = require("../config/db-connections")
const mongoCon = require("../config/mongo-connections")
var geoip = require('geoip-lite');


// ======================MongoDB functions ========================

async function LoginMongo(user_id) {
    const db = await mongoCon.EstablishConnection()
    var mangoquery = { "user_id": user_id };
    const findResult = await db.collection("users").find(mangoquery).toArray(function (err, userData) {
        return userData;
    })
    return findResult;
}


async function SignUpMongo(first_name_, last_name_, date_birth_, email_, organization_,
    position_, department_, location_, phone_number_, user_id_) {
    
    const db = await mongoCon.EstablishConnection()
    var newUser =
    {
        first_name: first_name_,
        last_name: last_name_,
        date_birth: date_birth_,
        email: email_,
        organization: organization_,
        position: position_,
        department: department_,
        location: location_,
        phone_number: phone_number_,
        user_id: user_id_
    };
    const AddResult = await db.collection("users").insertOne(newUser, function (err, ress) {
        return ress;
    })
    return AddResult;
}
// ============================== Main APIs ==============================

function Login(req, res) {
    if (req.body.user_name === undefined || req.body.user_pwd === undefined) {
        res.status(401)
        return res.json(
            {
                "user_id": 0,
            }
        );
    }

    var query = `SELECT * FROM users WHERE login_name = '${req.body.user_name}' AND user_pwd = '${req.body.user_pwd }'`;


    try {
        var con = dbCon.handleDisconnect()
        con.query(query, function (err, result,) {
            if (err) throw err;
            if (result[0] === undefined) {
                res.status(404)
                return res.json(
                    {
                        "user_id": 0
                    }
                );
            }
            else {
                if (result[0].user_id > 0) {
                    LoginMongo(result[0].user_id)
                        .then(resu => {
                            con.end()
                            res.status(200)
                            return res.json({
                                "user_id": result[0].user_id,
                                "user_token": result[0].user_token,
                                "working_group": result[0].group_name,
                                "role_name": result[0].role_name,
                                "first_name": result[0].first_name,
                                "last_name": result[0].last_name,
                                "user": resu[0]
                            })
                        })
                }
            }
        })
    }
    catch (error) {
        console.log(error)
        return res.json("Something Wrong");
    }
}

function CheckUsernameAvailability(req, res) {
    var query = "SELECT EXISTS(Select * FROM users WHERE login_name = " + "\"" + req.body.user_name + "\"" + ") As counts;"
    try {
        var con = dbCon.handleDisconnect()
        con.query(query, function (err, result) {
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

function SignUp(req, res) {

    if (req.body.user_name === ""
        || req.body.user_pwd === "") {
        res.status(401)
        return res.json(
            {
                "user_id": 0,
            }
        );

    }
    const newToken = userAuthen.GenerateNewToken(req.body.newUser)
    var query = "INSERT INTO users(login_name, user_pwd, user_role_id, user_token , working_group_id, first_name, last_name) VALUES("
        + "\"" + req.body.newUser.user_name + "\"" + ","
        + "\"" + req.body.newUser.user_pwd + "\"" + ","
        + "\"" + 1 + "\"" + ","
        + "\"" + newToken + "\"" + ","
        + "\"" + 1 + "\"" + ","
        + "\"" + req.body.newUser.first_name + "\"" + ","
        + "\"" + req.body.newUser.last_name + "\"" + ");"
    try {
        var con = dbCon.handleDisconnect()
        con.query(query, function (err, result, fields) {
            if (err == null && result.insertId > 0) {
                try {
                    SignUpMongo(req.body.newUser.first_name, req.body.newUser.last_name, req.body.newUser.date_birth,
                        req.body.newUser.email, req.body.newUser.organization, req.body.newUser.position, req.body.newUser.department, req.body.newUser.location,
                        req.body.newUser.phone_number, result.insertId)
                        .then
                        (resu => {
                            res.status(200)
                            //con.end()
                            return res.json
                                (
                                    {
                                        "user_id": result.insertId,
                                        "user_token": newToken
                                    }
                                );
                        }
                        )


                } catch (error) {
                    res.status(400);
                    con.end()
                    return res.json(error);
                }
            }
            else {
                res.status(400);
                con.end()
                return res.json
                    (
                        {
                            "error": err.sqlMessage,
                        }
                    );
            }
        });
    }
    catch (error) {
        res.status(400);
        con.end()
        return res.json(error);
    }
}

function HealthTest(req, res) {
    return res.json(
        {
            "healthy_05.03": true
        }
    )
}

function LocationGuard(req, res) {
    const clientIp = req.header('x-forwarded-for')
    var geo = geoip.lookup(clientIp);
    return res.json(
        {
            "location": geo
        }
    )
}

function ExFELTest(req, res) {
    const clientIp = req.header('x-forwarded-for')
    if(clientIp)var geo = geoip.lookup(clientIp);
    return res.json(
        {   
            "location": geo.city,
            "answer from Siegen": req.body
        }
    )
    
}


module.exports = { Login, SignUp, CheckUsernameAvailability, HealthTest, LocationGuard, ExFELTest};
