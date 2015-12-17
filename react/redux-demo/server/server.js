/**
 * 简单的测试数据提供Server
 */
var http = require("http");
var fs = require("fs");
var sleep = require("sleep");

var testFile = __dirname + "/tests/todos.json",
    testJsonStr = fs.readFileSync(testFile, {encoding : "utf8"});

var server = http.createServer(function(req, response){
    sleep.sleep(2);
    var body = testJsonStr;
    response.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin' : '*'
    });
    response.write(body);
    response.end();
});

server.listen(8887);
