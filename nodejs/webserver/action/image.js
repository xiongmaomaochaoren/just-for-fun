
var fs = require("fs"),
	Path = require("path");

var relativePath = "../../../UI/json_data/imgs.json";
var jsonPath = Path.resolve(__dirname, relativePath);


module.exports = function(urlInfo, req, res){
	var images = JSON.parse(fs.readFileSync(jsonPath));
	var start = urlInfo["params"]["start"] ? urlInfo["params"]["start"] : 0,
		end = urlInfo["params"]["length"] ? urlInfo["params"]["length"] : 10;

	var subImages = images.slice(start, start+end);
	var imageStr = JSON.stringify(subImages);
	res.write(imageStr);
	res.end();
}