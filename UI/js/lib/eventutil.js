define(function(){
	var EventUtil = {
		addEvent : function(element, type, handler){
			if(window.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(window.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		},
		removeEvent : function(element, type, handler){
			if(window.removeEventLister){
				element.removeEventLister(type, handler, false);
			}else if(window.detachEvent){
				element.detachEvent("on" + type, handler);
			}else{
				element["on" + type] = null;
			}	
		}
	}
	return EventUtil;
});