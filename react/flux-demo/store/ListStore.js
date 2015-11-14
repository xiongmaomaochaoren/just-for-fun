
import Macroevent from "../lib/microevent.js";
import AppDispatcher from "../AppDispatcher";
import ITEM_ACTION_CONSTANTS from "../constants/ListItemConstants";

class ListStore{

    constructor(){
        this.lists = [];
    }

    getLists(){
        return this.lists;
    }
    addList(item){
        this.lists.push(item);
    }

}
Macroevent.mixin(ListStore);

let listStore = new ListStore();

/**
 * 具体的事件注册，应该由Store自己负责维护，而不是统一在AppDispatch维护
 */
AppDispatcher.register(function(action){
    switch(action.eventName){
        case ITEM_ACTION_CONSTANTS.ITEM_ADD:
            listStore.addList(action.data);
            listStore.trigger("change");
            break;
    }
});

module.exports = listStore;
