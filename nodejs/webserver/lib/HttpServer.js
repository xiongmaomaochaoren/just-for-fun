/**
 * 1. 提供浏览功能
 *    目录 ： 浏览结构
 * 	  文件 ： HTML、JS、Css、PHP、Json、其他格式下载文件
 * 2. --root 指定Webroot根目录 --port 指定根目录
 * 3. 多进程方案
 * 	  child_process方案
 *    cluster方案
 */

var http = require("http"),
	fs = require("fs");

var Parser = require("./ParserUtil.js"),
	Display = require("./DisplayUtil.js");

function HttpServer(port, root){
	this.webroot = root;
	this.port = port;
	this.server = null;
}

HttpServer.prototype.start = function(){
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
