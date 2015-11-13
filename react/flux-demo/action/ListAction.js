
import AppDispatcher from "../AppDispatcher";

class ListAction{
    static add(itemStr){
        AppDispatcher.dispatch({
            eventName : "add",
            data : itemStr
        });
    }
}

module.exports = ListAction;