
'use strict';

var http = require("http");
var https = require("https");

const HttpUtil = {
    promiseGet : function(url, type){
        return new Promise( (resolve, reject) => {
            let protocalProxy = ( type == "http" ? http : https );
            protocalProxy.get(url, function(res){
                let resStr = "";
                res.on("data", function(data){
                    resStr += data;
                });
                res.on("end", function(){
                    try {
                        let resJson = JSON.parse(resStr);
                        resolve(resJson);
                    }catch(e){
                        reject(e.message);
                    }
                });
            }).on("error", function(){
                reject(e.message);
            });
        });
    }
}

module.exports = HttpUtil;
