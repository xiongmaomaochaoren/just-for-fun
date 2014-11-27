define(["./util.js"], function(Util){
	var Drag = {};

	//clientY screenY  pageY区别
	function mousemoveHandler(e){
		var left = Math.round(e.pageX - e.currentTarget.clientWidth/2),
			top = Math.round(e.pageY - e.currentTarget.clientHeight/2);

		e.currentTarget.style.left = left + "px";
		e.currentTarget.style.top = top + "px";
	}

	Drag.draggable = function(doms){

		document.ondragstart = function(){
			return false;
		}
		
		for(var i=0; i<doms.length; i++){
			doms[i].addEventListener("mousedown", function(e){
				Util.applyStyles(e.currentTarget, {
					"-webkit-transition" : "none"
				});
				e.currentTarget.addEventListener("mousemove", mousemoveHandler, false);
			}, false);
			doms[i].addEventListener("mouseup", function(e){
				Util.applyStyles(e.currentTarget, {
					"-webkit-transition" : "all 0.5s"
				});
				e.currentTarget.removeEventListener("mousemove", mousemoveHandler, false);
			}, false);
		}
		
	}

	return Drag;
});