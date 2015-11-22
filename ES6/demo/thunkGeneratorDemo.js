import { asyncAdd,asyncMulty } from "../util/asyncFn";
import { thunkfy }  from "../util/thunk";
import { runGenerator } from "../util/coGenerator";

let thunkSyncAdd = thunkfy(asyncAdd);
let thunkSyncMulty = thunkfy(asyncMulty);

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
    runGenerator(function *(num1 = 5, num2 = 6){
        let addResult = yield thunkSyncAdd(num1, num2);
        let multyResult = yield thunkSyncMulty(num1, num2);
        let resultStr = `Add Result ${addResult}, Multy Result ${multyResult}. Report From StartAutoDemo Fn`;
        console.log(resultStr);
    });
}

export default { startManualDemo, startAutoDemo };
