
/**
 *  1. 去trunkfy化 ： 去掉毁掉函数，是调用看起来同步化
 *  2. next需要放到回调函数中执行，以达到阻塞程序的目的
 */

function asyncFn(num, cb){
	setTimeout(cb, num);
}

asyncFn(2000, function(){
	console.log("fdsfd");
});