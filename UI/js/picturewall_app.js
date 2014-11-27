
requirejs(["./js/lib/picwall.js"], function(Picwall){
	var images = [
		"./img/img_1.jpg",
		"./img/img_2.jpg",
		"./img/img_3.jpg",
		"./img/img_4.jpg",
		"./img/img_5.jpg",
		"./img/img_6.jpg",
		"./img/img_7.jpg",
		"./img/img_8.jpg",
		"./img/img_9.jpg",
		"./img/img_10.jpg",
	];
	var id = "pic-wall";
	var picwall = new Picwall(id, images, {
		left : 700,
		top : 500
	});
	picwall.init();
});