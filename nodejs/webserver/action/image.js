
var fs = require("fs"),
	Path = require("path");

var relativePath = "../../../UI/json_data/imgs.json";
var jsonPath = Path.resolve(__dirname, relativePath);


module.exports = function(urlInfo, req, res){

	var images = JSON.parse(fs.readFileSync(jsonPath));

	var start = parseInt(urlInfo["params"]["start"] ? urlInfo["params"]["start"] : 0),
		length = parseInt(urlInfo["params"]["length"] ? urlInfo["params"]["length"] : 10);

	//图片循环展示 例如第25张展示第一张
	var subImages = [];
	if(start >= images.length){
		start = start % images.length;
	}
	if((start+length) >= images.length){
		subImages = images.slice(start);
		var left = length - (images.length - start);
		subImages = subImages.concat(images.slice(0, left));
	}else{
		subImages = images.slice(start, start+length);
	}

	var imageStr = JSON.stringify(subImages);
	res.write(imageStr);
	res.end();
}