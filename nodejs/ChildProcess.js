
var child_process = require("child_process");

var num = 10;
var testFile = __dirname + "/test.js";

var children = [];

for(var i=0; i<num; i++){
	children.push(child_process.fork(testFile));
}

console.log(children);