var fs = require("fs"),
	Path = require("path");

var Parser = {
	parsePath : function(filepath){
		var pathStat = fs.statSync(filepath),
			pathInfo = {};

		if(pathStat.isFile()){
			pathInfo.type = "file";
			pathInfo.ext = Path.extname(filepath).replace(".", "");
		}else if(pathStat.isDirectory()){
			pathInfo.type = "directory";
		}else{
			pathInfo.type = "other";
		}
		pathInfo["size"] = pathStat.size;
		pathInfo["path"] = filepath;

		return pathInfo;
	},
	parseUrl : function(url){
		var urlTokens = url.split("?"),
			urlInfo = {};

		urlInfo["path"] = urlTokens[0];
		var pathTokens = urlTokens[0].split(Path.sep);
		for(var i=0; i<pathTokens.length; i++){
			if(pathTokens[i] == ""){
				pathTokens.splice(i, 1);
			}
		}
		urlInfo["token"] = pathTokens;
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