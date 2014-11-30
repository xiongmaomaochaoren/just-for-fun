var fs = require("fs");

var Parser = {
	parsePath : function(path){
		var pathStat = fs.statSync(path),
			pathInfo = {};

		if(pathStat.isFile()){
			pathInfo.type = "file";
			var pathTokens = path.split(".");
			pathInfo.ext = pathTokens[pathTokens.length - 1];
		}else if(pathStat.isDirectory()){
			pathInfo.type = "directory";
		}else{
			pathInfo.type = "other";
		}
		pathInfo["size"] = pathStat.size;
		pathInfo["path"] = path;

		return pathInfo;
	},
	parseUrl : function(url){
		var urlTokens = url.split("?"),
			urlInfo = {};

		urlInfo["path"] = urlTokens[0];
		if(urlTokens[1]){
			var params = {},
				paramTokens = urlTokens[1].split("&");
			
			for(var i=0; i<paramTokens.length; i++){
				var tmpParams = paramTokens[i].split("=");
				params[tmpParams[0]] = tmpParams[1];
			}
			urlInfo["params"] = params;
		}
		return urlInfo;
	},
	parseCmdArgvs : function(argvs){
		var args = {};
		for(var i=0; i<argvs.length; i++){
			if(argvs[i].indexOf("=") >= 0){
				var tokens = argvs[i].split("=", 2);
				argvs[tokens[0]] = tokens[1];
			}
		}
		return args;
	}
}

module.exports = Parser;