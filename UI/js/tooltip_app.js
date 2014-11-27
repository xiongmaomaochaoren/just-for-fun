
requirejs(["./js/lib/tooltip.js"], function(Tooltip){
	var styles = {			
		
	};
	var tooltip = new Tooltip("paas_tooltip", "this is a tooltip test", styles);
	tooltip.init();

	var image = "<img src=\"./img/mm1.jpg\"/>"
	var tooltip2 = new Tooltip("second_tooltip", image);
	tooltip2.init();
});