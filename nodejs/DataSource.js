var fs = require("fs");

var express = require("express");

var app = express();

app.get("/result", function(req, res){
    var resultType = req.query.type;
    var fileName = __dirname + "/data/" + resultType + ".json";
    var content = fs.readFileSync(fileName, {
        encoding : "utf8"
    });
    var contentJson = JSON.parse(content);
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET",
        "Access-Control-Allow-Credentials": "true"
    });
    res.json(contentJson);
	res.send(req.baseUrl);
});

app.listen("8090");
