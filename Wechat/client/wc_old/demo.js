/**
 * @author wangcheng
 * @desc   微信JS-SDK封装widget
 */
/**
 * [pri 私有方法，不可读]
 */
var weichatPri = {
	/**
	 * [jsApiList]
	 * @type {Array}
	 */
	jsApiList : [
		'checkJSApi',
		'onMenuShareTimeline',
		'onMenuShareQQ',
		'onMenuShareAppMessage',
		'onMenuShareWeibo'
	],
	/**
	 * @url {String} [API post请求地址]
	 * @type {String}
	 */
	url : "/thirdPlugin/weiChatApi",
	/** [getSdkApi post请求获取SDK API] */
	getSdkApi : function(callback){
		$.get(weichatPri.url+"?fr="+encodeURIComponent(location.href.split('#')[0]), function(res){
			if(typeof callback == 'function'){
				callback(res);
			}
		});
	},
};
var weichatSDK = function(option){
	this._mOption = {
		checkJSApi : option.checkJSApi || false,
		debug : option.debug || false,
		title : option.title || "PP租车，最划算的网上租车",
		desc : option.desc || "比市场价低30%；MINI、SUV、GL8上千车型任你选；就近租身边的车",
		link : option.link  || "http://www.ppzuche.com",
		imgUrl : option.imgUrl|| "http://static.ppzuche.com/pics/icon.png"
	};
	this.init();
};

weichatSDK.prototype = {
	/**
	 * [init 程序初始化]
	 * @param  {object} option [{checkJSApi,debug,title,desc,link,imgUrl}]
	 * @return {none}          [无]
	 */
	init : function(option){

		var _this = this;
		_this.initConf(function () {

			_this.checkJsApi(function () {
				//初始化
				_this.setShareTimeline(_this._mOption);
				_this.setShareAppMessage(_this._mOption);
				_this.setShareQQ(_this._mOption);
				_this.setShareWeibo(_this._mOption);
			});
		});
	},

	/**
	 * [initConf 微信接口初始化]
	 * @param  {Function} callback [微信程序完成回调函数]
	 * @return {none}              [无]
	 */
	initConf : function(callback){
		var _this = this;

		weichatPri.getSdkApi(function (res){
			var data = $.parseJSON(res);
			wx.config({
				debug : _this._mOption.debug,
				appId : data.appId,
				timestamp : data.timestamp,
				nonceStr : data.nonceStr,
				signature : data.signature,
				jsApiList: weichatPri.jsApiList
			});
			wx.ready(function (){
				if(typeof callback == 'function'){
					callback();
				}
			});
			wx.error(function (res) {
				//alert(JSON.stringify(res));
			})
		});
	},
	/**
	 * [checkJsApi 检测微信API时候运行正常]
	 * @return {none} [无]
	 */
	checkJsApi : function(callback){
		var _this = this;
		wx.checkJsApi({
			jsApiList : weichatPri.jsApiList,
			success : function(res) {
				if(typeof callback == "function"){
					callback();
				}
			}
		});
	},
	/**
	 * [setShareTimeline 初始化分享到朋友圈]
	 * @param {object} optionData [{title,link,imgUrl}]
	 */
	setShareTimeline : function(optionData){
		var _this = this;
		wx.onMenuShareTimeline({
			title  : optionData.title,
			desc : optionData.desc,
			link   : optionData.link,
			imgUrl : optionData.imgUrl,
			success : function(res) {
				_this.success(res);
			},
			cancel : function(res) {
				_this.cancel(res);
			}
		});
	},
	setShareAppMessage : function(optionData){
		var _this = this;
		//alert("setShareAppMessage fun");
		wx.onMenuShareAppMessage({
		    title  : optionData.title,
			desc : optionData.desc,
			link   : optionData.link,
			imgUrl : optionData.imgUrl,
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () {
		        _this.success(res);
		    },
		    cancel: function () {
		        _this.cancel(res);
		    }
		});
	},
	/**
	 * [setShareQQ 初始化分享到QQ]
	 * @param {object} optionData [{title,desc,link,imgUrl}]
	 */
	setShareQQ : function(optionData){
		var _this = this;
		wx.onMenuShareQQ({//
			title  : optionData.title,
			desc : optionData.desc,
			link   : optionData.link,
			imgUrl : optionData.imgUrl,
			trigger : function(res) {
				_this.trigger(res);
			},
			complete : function(res) {
				_this.complete(res);
			},
			success : function(res) {
				_this.success(res);
			},
			cancel : function(res) {
				_this.cancel(res);
			},
			fail : function(res) {
				_this.fail(res);
			}
		});
	},
	/**
	 * [setShareWeibo 初始化分享到微博]
	 * @param {object} optionData [{title,desc,link,imgUrl}]
	 */
	setShareWeibo : function(optionData){
		var _this = this;
		wx.onMenuShareWeibo({
			title  : optionData.title,
			desc : optionData.desc,
			link   : optionData.link,
			imgUrl : optionData.imgUrl,
			trigger : function(res) {
				_this.trigger(res);
			},
			complete : function(res) {
				_this.complete(res);
			},
			success : function(res) {
				_this.success(res);
			},
			cancel : function(res) {
				_this.cancel(res);
			},
			fail : function(res) {
				_this.fail(res);
			}
		});
	},
	/**
	 * [trigger 微信trigger，用户重构方法]
	 * @param  {object} res [回调参数]
	 * @return {none}       [无]
	 */
	trigger : function(res){
		//trigger code
	},
	/**
	 * [success 微信success，用户重构方法]
	 * @param  {object} res [回调参数]
	 * @return {none}       [无]
	 */
	success : function(res){
		//success code
	},
	/**
	 * [complete 微信complete，用户重构方法]
	 * @param  {object} res [回调参数]
	 * @return {none}       [无]
	 */
	complete : function(res){
		//complete code
	},
	/**
	 * [cancel 微信cancel，用户重构方法]
	 * @param  {object} res [回调参数]
	 * @return {none}       [无]
	 */
	cancel : function(res){
		//cancel code
	},
	/**
	 * [fail 微信fail，用户重构方法]
	 * @param  {object} res [回调参数]
	 * @return {none}       [无]
	 */
	fail : function(res){
		//fail code
	}
}
module.exports = weichatSDK;
