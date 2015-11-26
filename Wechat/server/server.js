'use strict';

var url = require("url");

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var WXSdk = require("./action/wxsdk.js");


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/node/wx_signature", function(req, res){
    let referrerUrl = req.query.referrerUrl;
    WXSdk.getSignaturePackage(referrerUrl, (signaturePackage) => {
        res.set({
			"Access-Control-Allow-Origin": "*"
			,"Access-Control-Allow-Methods": "POST,GET"
			,"Access-Control-Allow-Credentials": "true"
		});
        console.log(signaturePackage);
		res.json(signaturePackage);
    });
});

app.listen(8080);
