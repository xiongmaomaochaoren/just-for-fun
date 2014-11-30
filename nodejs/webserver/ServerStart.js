var Parser = require("./lib/ParserUtil.js"),
	HttpServer = require("./lib/HttpServer.js");

var cmdArgs = Parser.parseCmdArgvs(process.argv);
var webroot = cmdArgs.root ? cmdArgs.root : __dirname + "/../../",
	port = cmdArgs.port ? cmdArgs.port : 8090;

console.log(webroot);

var httpServer = new HttpServer(port, webroot);
httpServer.start();