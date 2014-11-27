
function sleep(num){
	var num = parseFloat(num);
	if(typeof num == "number"){
		var result = true,
		startTime = (new Date()).getTime();

		while(result){
			var endTime = (new Date()).getTime();
			if((endTime - startTime) >= num * 1000){
				result = false;
			}
		}
	}else{
		console.log(num + " is not a number");
	}
	
}

var startTime = (new Date()).getSeconds();
console.log(startTime);
sleep("4");
var endTime = (new Date()).getSeconds();
console.log(endTime);