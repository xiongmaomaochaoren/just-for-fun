
requirejs(["./js/lib/util.js", "./js/lib/eventutil.js", "./js/lib/waterfall.js"], function(Util, EventUtil, Waterfall){


	var columnNum = 4,
		lineNum = 2,
		id = "waterfall_ui",
		baseUrl = "http://localhost:8090/action/image";

	var params = {
		start : 1,
		length : columnNum * lineNum
	};

	var waterfall = new Waterfall(id, columnNum);
	var url = Util.urlFormat(baseUrl, params);

	Util.request(url, function(imageStr){
		var images = JSON.parse(imageStr);
		waterfall.addImage(images);
	}, function(){

	});

	function handleScroll(e){
		var clientHeight = Util.getClientHeight(),
	 		scrollTop = Util.getScrollTop(),
	 		scrollHeight = Util.getScrollHeigth();
	 	if(clientHeight + scrollTop + 100 >= scrollHeight){
	 		EventUtil.removeEvent(window, "scroll", handleScroll);
			var params = {
				start : columnNum * lineNum,
				length : columnNum
			}
			var url = Util.urlFormat(baseUrl, params);
			lineNum++;
	 	 	Util.request(url, function(imageStr){
				var images = JSON.parse(imageStr);
				waterfall.addImage(images);
				EventUtil.addEvent(window, "scroll", handleScroll);
			}, function(){

			});
	 	}
	}
	EventUtil.addEvent(window, "scroll", handleScroll);

});