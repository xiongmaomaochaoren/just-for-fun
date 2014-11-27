
var fs = require("fs"),
	util = require("util");

function getDirFiles(dir){
	var allFiles = fs.readdirSync(dir);
	var files = [];
	for(var i in allFiles){
		var file = dir + "/" + allFiles[i];		
		if(fs.existsSync(file)){
			console.log(file + " 存在");
			var fileStat = fs.statSync(file);
			if(fileStat.isDirectory()){
				files = files.concat(getDirFiles(file));
			}else if(fileStat.isFile()){
				files.push(file);
			}
		}
	}
	return files;
}


function copyWithIndicator(source, dest){
	if(fs.existsSync(source)){
		/*
		方法一
		var content = fs.readFileSync(source, {
			encoding : "utf8"
		});
		fs.writeFileSync(dest, content);
		*/
		/*
		方法二
		var writeStream = fs.createWriteStream(dest);
		fs.createReadStream(source).pipe(writeStream);
		*/
		var readSteam = fs.createReadStream(source),
			writeStream = fs.createWriteStream(dest);

		readSteam.on("data", function(chunk){
			if(writeStream.write(chunk) === false){
				readSteam.pause();
			}
		});

		writeStream.on("drain", function(){
			readSteam.resume();
		});

		readSteam.on("end", function(){
			if(indicatorTimer){
				clearInterval(indicatorTimer);
			}
			writeStream.end();
		});

		var sourceStat = fs.statSync(source),
			sourceSize = sourceStat.size;

		var indicatorTimer = setInterval(function(){
			var destStat = fs.statSync(dest),
				destSize = destStat.size;

			var percentage = Math.ceil((destSize / sourceSize) * 100);
			console.log("已经Copy = " + destSize + " 完成百分比 = " + percentage);
		}, 1000);

	}else{
		console.log("文件不存在");
	}
}

copyWithIndicator("./big/ps.dmg", "./big/test.dmg");
//console.log(getDirFiles("./html"));
