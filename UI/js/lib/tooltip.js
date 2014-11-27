
define(["./eventcenter.js", "./util.js"],function(Eventcenter, Util){


	function Tooltip(id, msg, style){
		var self = this,
			tooltipRef = document.getElementById(id);
		self.tooltipRef = tooltipRef;
		var left = tooltipRef.offsetLeft - tooltipRef.clientWidth;
		var top = tooltipRef.offsetTop + tooltipRef.clientHeight;
		self.defalutStyle = {
			display : "none",
			position : "absolute",
			"background-color" : "black",
			"z-index" : 5001,
			color : "yellow",
			border : "1px solid blue",
			left : left,
			top : top,
			padding : "5px"
		};
		self.currentStyle = style ? Util.extendObj(self.defalutStyle, style) : self.defalutStyle;
		self.msg = msg;

		var tooltipDiv = document.createElement("div");

		tooltipDiv.innerHTML = msg;
		Util.applyStyles(tooltipDiv, self.currentStyle);
		tooltipRef.parentNode.insertBefore(tooltipDiv, tooltipRef);

		self.tooltip = tooltipDiv;
	}


	Tooltip.prototype.init = function(){
		var self = this;
		self.tooltipRef.onmouseover = function(e){
			if(!Util.isAncestor(e.relatedTarget, e.currentTarget) && (e.relatedTarget != e.currentTarget)){
				self.display();	
			}
		}
		self.tooltipRef.onmouseout = function(e){
			if(!Util.isAncestor(e.relatedTarget, e.currentTarget) && (e.relatedTarget != e.currentTarget)){
				self.hide();	
			}
		}
	}

	Tooltip.prototype.display = function(){
		var self = this;
		self.tooltip.style.display = "block";
	}

	Tooltip.prototype.hide = function(){
		var self = this;
		self.tooltip.style.display = "none";
	}

	return Tooltip;
});