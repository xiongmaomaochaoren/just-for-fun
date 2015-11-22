
import {timeout, getJSON} from "../util/promise";

function start(){
    timeout(1000).then( (value) => {
        console.log(value);
    });

    let ajaxUrl = "http://localhost:8887/";
    getJSON("http://localhost:8887/")
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
}

export default { start };
