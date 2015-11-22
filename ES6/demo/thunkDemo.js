
import { thunkfy }  from "../util/thunk";

function start(){
    function asyncAdd(num1, num2, cb){
        setTimeout(function(){
            let finalResult = num1 + num2;
            console.log(`from setTimeout result ${finalResult}`);
            cb(finalResult);
        }, 2000);
    }

    let syncAdd = thunkfy(asyncAdd);
    syncAdd(1,2)(function(result){
        console.log(`from callback result ${result}`);
    });
}

export default { start }
