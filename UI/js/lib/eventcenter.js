define(function(){
	function EventCenter(){
		this.eventDatas = {};
	}

	EventCenter.prototype.on = function(event, callback){
		var self = this;
		if(self.eventDatas[event]){
			self.eventDatas[event].push(callback);
		}else{
			self.eventDatas[event] = [callback];
		}
	};

	EventCenter.prototype.trigger = function(event){
		var self = this;
		if(self.eventDatas[event] && self.eventDatas[event].constructor == Array){
			for(var i=0; i<self.eventDatas[event].length; i++){
				if(typeof self.eventDatas[event][i] == "function"){
					var argsArray = Array.prototype.slice.call(arguments);
					self.eventDatas[event][i].apply(self, argsArray);
				}
			}
		}
	};

	return EventCenter;
});