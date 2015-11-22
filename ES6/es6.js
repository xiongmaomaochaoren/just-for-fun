
import {timeout, getJSON} from "./demo/promiseDemo";

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
