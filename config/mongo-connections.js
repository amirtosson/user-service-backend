const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://3.64.14.232:28017';
const dbName = 'daphne';

const client = new MongoClient(mongoUrl);
async function EstablishConnection(){
    await client.connect();
    const db = client.db(dbName);
    return db
}

module.exports ={EstablishConnection}