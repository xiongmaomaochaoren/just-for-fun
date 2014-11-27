/**
 * todo : 
 *   1. 派发dragstart drag dragend  hover等事件
 */
define(["./eventcenter.js", "./util.js", "./drag.js"], function(Eventcenter, Util, Drag){

	/**
	 * options 
	 * 	 width、height : 设置wall的宽度和高度
	 *   draggable : 是否可拖拽
	 */
	function Picwall(id, pics, options){
		var self = this,
			wallDiv = document.getElementById(id);

		self.el = wallDiv;
		self.pics = pics;
		options = options || {};
		//todo : 判断是否为null、clientWidth、clientX等属性
		self.maxLeft = options.left ? options.left : wallDiv.clientWidth;
		self.maxTop = options.top ? options.top : wallDiv.clientHeight;
		self.options = options;

		//添加图片相册
		var imgStr = "";
		for(var i=0; i<self.pics.length; i++){
			var left = Math.round(Math.random() * self.maxLeft);
			var top = Math.round(Math.random() * self.maxTop);
			var deg = Math.round(Math.random() * 70);	
			if(Math.random() > 0.5){
				deg = 0-deg;
			}
			imgStr += "<div class=\"img-album\" data-deg=\"" + deg + "\" style=\"left:" + left + "px;top:" + top + "px;-webkit-transform:rotate(" + deg + "deg);\">";
			imgStr += "<img src=\"" + self.pics[i] + "\"/>";
			imgStr += "</div>";
		}
		self.el.innerHTML = imgStr;

	}

	Picwall.prototype.init = function(){
		var self = this,
			classname = "img-album";
		var picDivs = self.el.getElementsByTagName("div");

		for(var i=0; i<picDivs.length; i++){
			if(Util.hasClass(picDivs[i], classname)){
				picDivs[i].addEventListener("mouseover", function(e){
					if(e.relatedTarget != e.currentTarget && !Util.isAncestor(e.relatedTarget, e.currentTarget)){
						//todo style和getAttribute区别
						Util.applyStyles(e.currentTarget, {
							"-webkit-transition" : "all 0.5s",
							"-webkit-transform" : "rotate(0deg) scale(1.2,1.2)",
							"z-index" : 999
						});	
					}
				}, false);
				picDivs[i].addEventListener("mouseout", function(e){
					if(e.relatedTarget != e.currentTarget && !Util.isAncestor(e.relatedTarget, e.currentTarget)){
						var deg = e.currentTarget.getAttribute("data-deg");
						var transform = "rotate(" + deg + "deg)";
						Util.applyStyles(e.currentTarget, {
							"-webkit-transform" : transform,
							"z-index" : 0
						});
					}
				}, false);
				
			}
		}
		Drag.draggable(picDivs);
	}

	return Picwall;
});