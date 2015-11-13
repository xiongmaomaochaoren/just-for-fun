
import Flux from "flux";
import ListStore from "./store/ListStore";

var AppDispatcher = new Flux.Dispatcher();

AppDispatcher.register(function(action){
    switch(action.eventName){
        case "add":
        ListStore.addList(action.data);
        ListStore.trigger("change");
        break;
    }

});

module.exports = AppDispatcher;