
process.on("message", function(msg, handler){
	console.log(msg);
	console.log(handler);
	// handler.write("hello\n");
	// handler.end();
	handler.on("connection", function(req, res){
		console.log(req);
		console.log(res);
		res.end("handler by child");
	});
});