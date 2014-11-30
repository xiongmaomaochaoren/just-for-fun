/**
 * 封装XElement对象，类似Polymer，提供更方便的方法开发自定义标签
 */
function XElement(tagName, proto){
	
	var eleProto = Object.create(HTMLElement.prototype);
	for(var i in proto){
		eleProto[i] = proto[i];
	}
	var templateNode = document.currentScript.ownerDocument.getElementById("x-template");
	eleProto.template = templateNode.innerHTML;
	document.registerElement(tagName, {
		prototype : eleProto
	});
}