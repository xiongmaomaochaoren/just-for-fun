
function runThunkGenerator(generatorFn){
    let generatorPoint = generatorFn();
    //回调函数参考node标准，通常错误error作为第一个参数
    function next(error, data){
        var genResultObj = generatorPoint.next(data);
        if(genResultObj.done){
            return ;
        }
        genResultObj.value(next);
    }
    next();
}

function runPromiseGenerator(generatorFn){
    let generatorPoint = generatorFn();
    function next(data){
        var genResultObj = generatorPoint.next(data);
        if(genResultObj.done){
            return ;
        }
        genResultObj.value.then(function(data){
            next(data);
        });
    }
    next();
}

export { runThunkGenerator, runPromiseGenerator };
