define({
	extendObj : function(target, source){
		for(var i in source){
			if(source.hasOwnProperty(i) && !target[i]){
				target[i] = source[i];
			}
		}
		if(typeof source == "function" && typeof target == "function"){
			target.prototype = new source();
		}
		return target;
	},
	isAncestor : function(source,target){
		var result = false;
		while(source.parentNode){
			if(source.parentNode == target){
				result = true;
				break;
			}
			source = source.parentNode;
		}
		return result;
	},
	hasClass : function(el, name){
		var classes = el.className.split(/\s+/);
		for(var i=0; i<classes.length; i++){
			if(classes[i] == name){
				return true;
			}
		}
		return false;
	},
	addClass : function(el, name){
		el.className = el.className + " " + name; 
	},
	removeClass : function(el, name){
		var classes = el.className.split(/\s+/);
		for(var i=0; i<classes.length; i++){
			if(classes[i] == name){
				classes.splice(i, 1);
			}
		}
		el.className = classes.join(" ");
	},
	applyStyles : function(div, styles){
		for(var key in styles){
			var styleKey = this.camel(key);
			div.style[styleKey] = styles[key];
		}
	},
	camel : function(str){
		str.replace(/\-(\w)/g, function(){
		    if(arguments[1]){
		        return arguments[1].toUpperCase();
		    }
		});
		return str;
	}
});
