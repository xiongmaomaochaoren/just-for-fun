/**
 * Cluster
 *   理解
 * 		对API的理解
 *   问题
 * 		负载均衡机制的问题
 * 	 原理
 * 		进程间通信
 *		Server共享
 * 	 参考资料 
 *    	http://www.infoq.com/cn/articles/nodejs-cluster-round-robin-load-balancing
 * 		
 */

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
	cluster.on("exit", function(worker, code, signal) {
		console.log("worker " + worker.process.pid + "die");
	});
}else{
	var httpServer = new HttpServer(port, webroot);
	httpServer.start();
}