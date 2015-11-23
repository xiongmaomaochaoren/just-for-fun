import { promiseAdd, promiseMulty} from "../util/promise";
import { runPromiseGenerator } from "../util/coGenerator";

function startManualDemo(num1, num2){
    function *manualGenerator(num1, num2){
        let addResult = yield promiseAdd(num1, num2);
        let multyResult = yield promiseMulty(num1, num2);
        let finalResult = `Add Result ${addResult}, Multy Result ${multyResult}. Report From Promise StartManualDemo fn`;
        return finalResult;
    }
    let generatorPoint = manualGenerator(num1, num2);
    let addResultObj = generatorPoint.next();
    addResultObj.value.then(function(result){
        let multyResultObj = generatorPoint.next(result);
        multyResultObj.value.then(function(result){
            let finalResultObj = generatorPoint.next(result);
            console.log(finalResultObj.value);
        });
    });
}

function startAutoDemo(){
    runPromiseGenerator(function *(num1 = 10, num2 = 50){
        let addResult = yield promiseAdd(num1, num2);
        let multyResult = yield promiseMulty(num1, num2);
        let finalResult = `Add Result ${addResult}, Multy Result ${multyResult}. Report From Promise startAutoDemo fn`;
        console.log(finalResult);
    });
}

export default { startManualDemo, startAutoDemo };
