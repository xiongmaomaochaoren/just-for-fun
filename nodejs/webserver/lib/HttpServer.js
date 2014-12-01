/**
 * 1. 提供浏览功能
 *    目录 ： 浏览结构
 * 	  文件 ： HTML、JS、Css、PHP、Json、其他格式下载文件
 * 2. --root 指定Webroot根目录 --port 指定根目录
 * 3. 多进程方案
 * 	  child_process方案
 *    cluster方案
 */

/**
 * Http模块理解
 * 		对API的理解
 * 		和Net模块的关系：net模块API理解
 */
var http = require("http"),
	fs = require("fs"),
	Path = require("path");

var Parser = require("./ParserUtil.js"),
	Display = require("./DisplayUtil.js");

var ServerRoot = Path.dirname(__dirname);

function HttpServer(port, root){
	this.webroot = root;
	this.port = port;
	this.server = null;
}

/**
 * 路由规则：
 * 
 */
HttpServer.prototype.start = function(){

	function handleAction(urlInfo, req, res){
		var actionFile = Path.normalize(ServerRoot + Path.sep + urlInfo["token"][0] + Path.sep + urlInfo["token"][1] + ".js");
		if(fs.existsSync(actionFile)){
			var action = require(actionFile);
			action(urlInfo, req, res);
		}
	}

	var self = this;
	var server = http.createServer(function(req, res){
		if(req.method.toLowerCase() == "get"){
			var urlInfo = Parser.parseUrl(req.url);
			var path = self.webroot + "/" + urlInfo["path"];
			if(fs.existsSync(path)){
				var pathInfo = Parser.parsePath(path);
				pathInfo["subpath"] = urlInfo["path"];
				if(pathInfo.type == "file"){
					Display.displayFile(pathInfo, res);
				}else if(pathInfo.type == "directory"){
					Display.displayDirectory(pathInfo, res);
				}
			}else if(urlInfo["token"][0] == "action"){
				handleAction(urlInfo, req, res);
			}else{
				res.writeHead(404);
				res.end();
			}
		}else{

		}
	});

	server.on("clientError", function(exception, socket){
		console.log("clientError" + exception);
	});

	server.listen(this.port);
	this.server = server;
}



module.exports = HttpServer;
