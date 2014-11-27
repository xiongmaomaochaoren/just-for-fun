var http = require("http"),
	fs = require("fs"),
	exec = require("child_process").exec,
	baseDir = __dirname;

var server = http.createServer(function(req, res){
	var url = req.url;
	if(url.indexOf("?") >= 0){
		var urls = url.split("?");
		var params = urls[1].split("&");
		url = urls[0];
	}
	var fileName = baseDir + url;
	if(req.method == "GET"){
		if(fs.existsSync(fileName)){
			var ext = fileName.split(".")[1];
			if(ext == "php"){
				exec("php " + fileName, function(error, result){
					console.log(error);
					console.log(result);
					res.write(result);
					res.end();
				});
			}else if(ext == "dmg"){
				var readStream = fs.createReadStream(fileName);
				var size = fs.statSync(fileName).size;
				res.writeHead(200, {
					"Content-Length" :  size,
					"Content-Type" : "application/force-download"
				});
				
				//readStream.pipe(res);
				
				readStream.on("data", function(chunk){
					if(res.write(chunk) === false){
						readStream.pause();
					}
				});
				res.on("drain", function(){
					readStream.resume();
				});
				
				readStream.on("end", function(){
					res.end();
				});
				
			}else{
				var content = fs.readFileSync(fileName, {
					encoding : "utf-8"
				});
				res.write(content);
				res.end();	
			}
		}else{
			res.writeHead(404, "not find");
			res.end();
		}
	}else if(req.method == "POST"){
		res.write("ok");
		res.end();
	}
	
	
});

server.listen("8080");