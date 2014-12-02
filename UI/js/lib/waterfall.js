
define(["./util.js"], function(Util){

	function Waterfall(id, column){
		var columnBaseClass = "brick_waterfall_column";
		var columnClassPre = "brick_waterfall_column_outer_";

		this.imageClassPre = "brick_waterfall_img_outer_";
		this.imageClass = "brick_waterfall_img_outer";
		this.el = (typeof id == "string") ? document.getElementById(id) : id;
		this.colum = column;


		var columnDivStr = "";
		for(var i=0; i<column; i++){
			columnDivStr += "<div class=\"" + columnBaseClass + " " + columnClassPre + column + "\"></div>";
		}
		this.el.innerHTML = columnDivStr;
		/**
		 * querySelectorAll : 接收合法的Css选择器参数
		 */
		var columnDivs = this.el.querySelectorAll("." + columnBaseClass);
		this.columnDiv = columnDivs;
	}

	Waterfall.prototype.getImageStrs = function(images){
		var self = this,
			imageStrs = [];
		for(var i=0; i<images.length; i++){
			var heightClass = self.imageClassPre + self.getRandomHeight(),
				str = "";
			str += "<div class=\""+ this.imageClass + " " + heightClass + " \">";
			str += "<img src=\"" + images[i].src + "\"/>";
			str += "<div>" + images[i].description + "</div>";
			str += "</div>";
			imageStrs.push(str);
		}
		return imageStrs;
	}

	Waterfall.prototype.getRandomHeight = function(){
		var randomHeight = [200, 250, 300, 350];
		var random = Util.getRandom(0, 3);
		return randomHeight[random];
	}

	Waterfall.prototype.addImage = function(images){
		var self = this;
		var imageStrs = self.getImageStrs(images);
		for(var i=0; i<imageStrs.length; i++){
			var index = i%self.colum;
			self.columnDiv[index].innerHTML += imageStrs[i];
		}
	}

	return Waterfall;
})