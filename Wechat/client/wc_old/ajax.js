
function getJSON(url){
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4){
                return ;
            }
            if(xhr.status == 200){
                try{
                    let responseJson = JSON.parse(xhr.response);
                    resolve(responseJson);
                }catch(e){
                    reject(e.message);
                }
            }else{
                reject(xhr.statusText);
            }
        };
        xhr.send();
    });
}

export default { getJSON };
