
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
