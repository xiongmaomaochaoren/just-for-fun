import { promiseAdd, promiseMulty} from "../util/promise";

/**
 * async 更像是generator方案的语法糖形式，自带的generator的执行器
 */

function startAsyncDemo(){
    let asyncTest = async function(num1, num2){
        let addResult = await promiseAdd(num1, num2);
        let multyResult = await promiseMulty(num1, num2);
        console.log(addResult);
        console.log(multyResult);
        return addResult + multyResult;
    }
    var finalResult = asyncTest(20, 10);
    console.log(finalResult);
}

export default { startAsyncDemo } ;
