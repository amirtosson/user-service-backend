const CryptoJS = require("crypto-js");
const base64url = require('base64url');


function GenerateNewToken(user){ 
    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(user));
    var doi = base64url(stringifiedData.toString())
    const d = new Date()
    var token= d.getTime().toString()+ doi.substr(7,50)
    return token;    
}

function GenerateRandomDOI(name) {
    var stringifiedData = CryptoJS.enc.Utf8.parse(name);
    var doi = base64url(stringifiedData.toString())
    const d = new Date()
    var DOI= d.getTime().toString()+"."+ doi.substr(7,50)
    return DOI; 
}

module.exports = {GenerateNewToken, GenerateRandomDOI}