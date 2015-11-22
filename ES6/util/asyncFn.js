
function asyncAdd(num1, num2, cb){
    setTimeout(function(){
        let finalResult = num1 + num2;
        console.log(`from setTimeout result ${finalResult}`);
        cb(null, finalResult);
    }, 2000);
}

function asyncMulty(num1, num2, cb){
    setTimeout(function(){
        let finalResult = num1 * num2;
        console.log(`from setTimeout result ${finalResult}`);
        cb(null, finalResult);
    }, 2000);
}

export { asyncAdd, asyncMulty };
