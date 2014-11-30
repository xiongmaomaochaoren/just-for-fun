console.log("==========我是华丽丽的分割线===========");
var fs = require("fs");

var file = __filename;

var stat = fs.statSync(file);
console.log(stat.isFile());
console.log(stat.isDirectory());

var os = require("os");

console.log(os.type());
console.log(os.platform());