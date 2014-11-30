
var fs = require("fs");

var file = __filename;

var stat = fs.statSync(file);
console.log(stat.isFile());
console.log(stat.isDirectory());