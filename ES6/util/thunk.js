/**
 *  thunk函数生成器，多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。
 *  thunkfy ：和函数式编程中的`柯里化`概念比较类似
 * [thunkfy description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function thunkfy(fn){
    return function(){
        var args = Array.prototype.slice.call(arguments);
        return function(callback){
            args.push(callback);
            fn.apply(this, args);
        }
    }
}

export { thunkfy }
