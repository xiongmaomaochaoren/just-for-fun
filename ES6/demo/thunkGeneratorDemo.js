import { asyncAdd,asyncMulty } from "../util/asyncFn";
import { thunkfy }  from "../util/thunk";
import { runThunkGenerator } from "../util/coGenerator";

let thunkSyncAdd = thunkfy(asyncAdd);
let thunkSyncMulty = thunkfy(asyncMulty);

/**
 * 自动执行generator函数的原理 ： 当异步操作有结果之后，能够自动将控制权交回generator函数执行
 */

function startManualDemo(){
    function *manualGenerator(num1, num2){
        let addResult = yield thunkSyncAdd(num1, num2);
        let multyResult = yield thunkSyncMulty(num1, num2);
        let resultStr = `Add Result ${addResult}, Multy Result ${multyResult}. Report From StartManualDemo fn`;
        return resultStr;
    }
    let generatorPoint = manualGenerator(3, 4);
    let addResultObj = generatorPoint.next();
    addResultObj.value(function(error, addResult){
        let multyResultObj = generatorPoint.next(addResult);
        multyResultObj.value(function(error, multyResult){
            let resultStr = generatorPoint.next(multyResult);
            console.log(resultStr.value);
        });
    });
}

function startAutoDemo(){
    runThunkGenerator(function *(num1 = 5, num2 = 6){
        let addResult = yield thunkSyncAdd(num1, num2);
        let multyResult = yield thunkSyncMulty(num1, num2);
        let resultStr = `Add Result ${addResult}, Multy Result ${multyResult}. Report From StartAutoDemo Fn`;
        console.log(resultStr);
    });
}

export default { startManualDemo, startAutoDemo };
