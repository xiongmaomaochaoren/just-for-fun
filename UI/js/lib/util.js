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
	},
	request : function(url, onsucess, onfail){
		var xmlhttp = null;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				onsucess(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	},
	urlFormat : function(path, params){
		var url = path,
			paramStrs = [];
		for(var i in params){
			paramStrs.push(i + "=" + params[i]);
		}
		if(paramStrs.length > 0){
			url += "?" + paramStrs.join("&");
		}
		return url;
	},
	/**
	 *  scrollTop ： 滚动条滑动的距离
	 *  scrollHeigth ： 页面的总高度
	 *  clientHeigth ： 元素可见区域的高度
	 *  offsetHeigth ： 可见区域的高度，包括边框
	 *  没有DTD的怪异模式 document.documentElement可以获取上述几个值
	 *  有DTD的正常模式  document.body可以获取上述几个值
	 *  document.body ： 指页面的body节点
	 *  document.documentElement ： 指页面的根节点，html节点
	 *  参考资料 ： http://www.cftea.com/c/2010/10/ZROIXWE5YCZ6WQDJ.asp、http://www.cftea.com/c/751.asp
	 */
	getScrollTop : function(){
		var scrollTop = 0,
			bodyScrollTop = 0,
			documentScrollTop = 0;
		if(document.body){
			bodyScrollTop = document.body.scrollTop;
		}
		if(document.documentElement){
			documentScrollTop = document.documentElement.scrollTop
		}
		scrollTop = Math.max(bodyScrollTop, documentScrollTop);
		return scrollTop;
	},
	getScrollHeigth : function(){
		var scrollHeigth = 0,
			bodyScrollHeigth = 0,
			documentScrollHeigth = 0;
		if(document.body){
			bodyScrollHeigth = document.body.scrollHeight;
		}
		if(document.documentElement){
			bodyScrollHeigth = document.documentElement.scrollHeight;
		}
		scrollHeigth = Math.max(bodyScrollHeigth, documentScrollHeigth);
		return scrollHeigth;
	},
	getClientHeight : function(){
		var clientHeight = 0;
		clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		return clientHeight;
	},
	getRandom : function(start, end){
		var range = end - start;
		var rand = Math.random();
		var random = start + Math.round(rand * range);
		return random;
	},
	//求一个数组的最小元素
	minValue : function(nums){
		var min = nums[0],
			minIndex = 0;
		for(var i=0; i<nums.length; i++){
			if(nums[i] < min){
				min = nums[i];
				minIndex = i;
			}
		}
		return {
			value : min,
			index : minIndex
		}
	},
	maxValue : function(nums){
		var max = nums[0],
			maxIndex = 0;
		for(var i=0; i<nums.length; i++){
			if(nums[i] > max){
				max = nums[i];
				maxIndex = i;
			}
		}
		return {
			value : max,
			index : maxIndex
		}
	}
});
