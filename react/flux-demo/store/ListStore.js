
import Macroevent from "../lib/microevent.js";

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

var listStore = new ListStore();

module.exports = listStore;