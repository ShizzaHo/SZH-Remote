const fs = require("fs");

let filedata = [];

function SendDataAndGetResult(path){
    if(path == "undefined"){
        filedata.push = "C:\\";
        return filedata;
    }
}

module.exports = {
    SendDataAndGetResult: SendDataAndGetResult,
}