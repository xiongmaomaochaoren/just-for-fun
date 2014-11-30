
requirejs(["./lib/carousel"], function(Carousel){
	var images = [
        "./img/mm1.jpg",
        "./img/mm3.jpg",
        "./img/536625.jpg",
        "./img/2799936_095259035_2.jpg"
	];
	var srcs = [
		"http://www.baidu.com/",
		"http://www.baidu.com/",
		"http://www.baidu.com/",
		"http://www.baidu.com/"
	];
	var carousel = new Carousel("carousel", images, srcs);
	carousel.init();
	carousel.autoSlide();

	carousel.on("slide", function(){
		console.log("slide event catched");
	});
	carousel.on("mouseover", function(){
		console.log("mouseover event catched");
		console.log(arguments[0]);
		console.log(arguments[1]);
	});
	carousel.on("mouseout", function(){
		console.log("mouseout event catched");
	});
});
