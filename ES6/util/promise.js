import { asyncAdd,asyncMulty } from "../util/asyncFn";

export function timeout(ms){
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, ms, "done");
    });
}

export function getJSON(url){
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4){
                return ;
            }
            if(xhr.status == 200){
                resolve(xhr.response);
            }else{
                reject(xhr.statusText);
            }
        };
        xhr.send();
    });
}

export function promiseAdd(num1, num2){
    return new Promise( (resolve, reject) => {
        asyncAdd(num1, num2, function(error, result){
            resolve(result);
        })
    });
}

export function promiseMulty(num1, num2){
    return new Promise( (resolve, reject) => {
        asyncMulty(num1, num2, function(error, result){
            resolve(result);
        });
    });
}
