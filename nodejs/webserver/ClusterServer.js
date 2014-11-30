
var cluster = require("cluster"),
	Parser = require("./lib/ParserUtil.js"),
	HttpServer = require("./lib/HttpServer.js");

var cmdArgs = Parser.parseCmdArgvs(process.argv);
var webroot = cmdArgs.root ? cmdArgs.root : __dirname + "/../../",
	port = cmdArgs.port ? cmdArgs.port : 8090;

var cpus = require("os").cpus().length;

if(cluster.isMaster){
	for(var i=0; i<cpus; i++){
		cluster.fork();
	}
}else{
	var httpServer = new HttpServer(port, webroot);
	httpServer.start();
}