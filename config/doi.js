const CryptoJS = require("crypto-js");
const base64url = require('base64url');


function GenerateNewDatasetDOI(datasetName){ 
    var stringifiedData = CryptoJS.AES.encrypt(datasetName, datasetName)
    var doi = base64url(stringifiedData.toString())
    return doi.substr(0,150);    
}
function GenerateELNDOI(elnName, ownerID){ 
    const d = new Date()
    var stringifiedData = CryptoJS.AES.encrypt(elnName,d.getTime().toString())
    var doi = base64url(stringifiedData.toString())
    doi = ownerID + "."+ d.getTime().toString()+doi.substr(7,20);
    return doi;    
}

module.exports = {GenerateNewDatasetDOI, GenerateELNDOI}