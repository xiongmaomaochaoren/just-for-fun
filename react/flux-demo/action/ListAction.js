
import AppDispatcher from "../AppDispatcher";
import ITEM_ACTION_CONSTANTS from "../constants/ListItemConstants";

class ListAction{
    static add(itemStr){
        AppDispatcher.dispatch({
            eventName : ITEM_ACTION_CONSTANTS.ITEM_ADD,
            data : itemStr
        });
    }
}

module.exports = ListAction;
