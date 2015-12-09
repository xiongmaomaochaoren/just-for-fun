/**
 * @author wangcheng
 * @data   2015-12-09
 * @desc   WeChat SDK API签名对象
 */

'use strict';

let jsSHA = require("jssha");
let WeChatConstant = require("../constants/WeChat");

class WxSignatureModal{
    /**
     * [constructor description]
     * @param  {[type]} appId       [description]
     * @param  {[type]} jsApiTicket [description]
     * @param  {[type]} url         [description]
     * @return {[type]}             [description]
     */
    constructor(appId, jsApiTicket, url){
        this.url = url;
        this.appId = appId;
        this.jsApiTicket = jsApiTicket;
        this.jsApiList = WeChatConstant.JS_API_LIST;
        this.nonceStr = WxSignature._getNonceStr();
        this.timestamp = WxSignature._getTimeStamp();
        this.signature = WxSignature._getSignature(this.jsApiTicket, this.nonceStr, this.timestamp, this.url);
    }
    /**
     * 获取随机字符串
     * @return {[type]} [description]
     */
    static _getNonceStr(){
        return Math.random().toString(36).substr(2, 15);
    }
    /**
     * 获取时间戳
     * @return {[type]} [description]
     */
    static _getTimeStamp(){
        return parseInt( (new Date()).getTime() / 1000 ) + "";
    }
    /**
     * 生成js_sdk_api签名 : http://mp.weixin.qq.com/wiki/7/1c97470084b73f8e224fe6d9bab1625b.html
     * @param  {[type]} ticket    [description]
     * @param  {[type]} nonceStr  [description]
     * @param  {[type]} timestamp [description]
     * @param  {[type]} url       [description]
     * @return {[type]}           [description]
     */
    static _getSignature(ticket, nonceStr, timestamp, url){
        let signatureStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
        let shaObj = new jsSHA(signatureStr, "TEXT");
        return shaObj.getHash('SHA-1', 'HEX');
    }

    getSignatureInfo(){
        return {
            url : this.url,
            appId : this.appId,
            jsApiTicket : this.jsApiTicket,
            jsApiList : this.jsApiList,
            nonceStr : this.nonceStr,
            timestamp : this.timestamp,
            signature : this.signature
        }
    }

}

module.exports = WxSignatureModal;
