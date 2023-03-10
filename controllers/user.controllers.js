const mysql = require('mysql2');
const mongodb = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');
const userAuthen = require('../config/authorization')

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'daphne';

const client = new MongoClient(mongoUrl);

//const Sequelize = require("sequelize");



// const sequelize = new Sequelize(
//     'daphne',
//     'admin',
//     '26472647',
//      {
//        host: 'daphnemysqldb.c9zdqm1tdnav.eu-central-1.rds.amazonaws.com',
//        dialect: 'mysql'
//      }
// );

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

// ======================MongoDB functions ========================

async function LoginMongo(user_id) 
{
    await client.connect();
    const db = client.db(dbName);
    var mangoquery = {"user_id":user_id};
    const findResult =  await db.collection("users").find(mangoquery).toArray(function(err, userData)
    {
        return userData;
    })
    return findResult;
}


async function SignUpMongo(first_name_, last_name_, date_birth_, email_, organization_, 
                    position_, department_, location_, phone_number_, user_id_){

    await client.connect();
    const db = client.db(dbName);
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
    const AddResult = await db.collection("users").insertOne(newUser, function(err, ress) {
        return ress;
    })
    return AddResult;
}
// ============================== Mysql config and connection handling ==============================

const db_config = 
{
    host:"daphnemysqldb.c9zdqm1tdnav.eu-central-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password: "26472647",
    database: "daphne"
};
var con;
 function handleDisconnect() {
     con = mysql.createConnection(db_config);
    con.connect(function(err) 
     {            
         if(err) {                                  
             console.log('error when connecting to db:', err);
             setTimeout(handleDisconnect, 2000); 
         }                                     
    });                                     
     con.on('error', function(err) 
     {
         console.log('db error', err);
         if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
             handleDisconnect();                        
         } else {                                      
             throw err;                                 
         }
     });
 }
//handleDisconnect();

function Login(req,res)
{ 
     if (req.body.user_name === undefined || req.body.user_pwd === undefined) 
     {
         res.status(401)
        return res.json(
                 { 
                     "user_id": 0, 
                 }
             );
     }
    
     var query = "SELECT * FROM users INNER JOIN group_list ON users.working_group_id = group_list.group_id INNER JOIN roles_list ON users.user_role_id = roles_list.role_id WHERE login_name = " + "\""+req.body.user_name + "\"" + 
                 " AND user_pwd = " + "\""+req.body.user_pwd + "\""
     try 
     {
        handleDisconnect();
        con.query(query, function (err, result, ) 
        {
            if (err) throw err;
            if (result[0] === undefined ) {
                res.status(404)
                return res.json(
                    { 
                        "user_id": 0  
                    }
                );
            } 
            else 
            {
                if(result[0].user_id>0)
                {
                    LoginMongo(result[0].user_id)
                    .then(resu =>{
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
    catch (error) 
     { 
        console.log(error)
        return res.json("Something Wrong");
     }
}

function SignUp(req,res)
{ 
    if (req.body.user_name === "" 
    || req.body.user_pwd === "" 
    || req.body.user_role_id < 1 
    || req.body.working_group_id < 1) 
    {
        res.status(401)
        return res.json(
                { 
                    "user_id": 0, 
                }
            );
        
    }
    const newToken = userAuthen.GenerateNewToken(req.body)
    var query = "INSERT INTO users(login_name, user_pwd, user_role_id, user_token , working_group_id) VALUES("
    + "\""+ req.body.user_name + "\"" + ","
    + "\""+ req.body.user_pwd +  "\"" + ","
    + "\""+ req.body.user_role_id +  "\"" + ","
    + "\""+ newToken +  "\""+ ","
    + "\""+ req.body.working_group_id +  "\""+");" 
    try 
    {
        handleDisconnect();
        con.query(query, function (err, result, fields)   
        {
            if (err == null && result.insertId > 0) {
                try {
                    SignUpMongo(req.body.first_name, req.body.last_name, req.body.date_birth, 
                        req.body.email, req.body.organization, req.body.position, req.body.department, req.body.location,
                        req.body.phone_number,result.insertId)
                    .then
                    (resu =>{
                        console.log(resu)
                        con.end()
                        res.status(200)
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
                    return res.json(error);
                }
            }
            else
            {
                res.status(400);
                return res.json
                (
                    { 
                        "error": err.sqlMessage,         
                    }
                ); 
            }
        });
    } 
    catch (error) 
    {   
        res.status(400);
        return res.json(error);
    }
}

module.exports = {Login, SignUp};
