
import { thunkfy }  from "../util/thunk";
import { asyncAdd } from "../util/asyncFn";

function start(){
    let syncAdd = thunkfy(asyncAdd);
    syncAdd(1,2)(function(error, result){
        console.log(`from callback result ${result}`);
    });
}

export default { start }
