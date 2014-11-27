var http = require("http"),
	requestUrl = "http://www.baidu.com/";

// var httpClient = http.get(requestUrl, function(res){

// 	var result = "";
// 	res.on("data", function(data){
// 		result += data;
// 	});
// 	res.on("end", function(data){
// 		result += data;
// 		console.log(result);
// 	});
// });

var options = {
	method : "POST",
	hostname : "localhost",
	port : 8080,
	path : "/"
};

var req = http.request(options, function(res){
	var result = "";
	res.on("data", function(data){
		result += data;
	});
	res.on("end", function(){
		console.log(result);
	});
});

req.on("error", function(error){
	console.log(error);
});

req.end();