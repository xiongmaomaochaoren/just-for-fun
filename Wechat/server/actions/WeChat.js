/**
 * @author wangcheng
 * @data   2015-11-24
 * @desc   生成WeChat签名Action
 */

'use strict';

let rrdPath = rrd.path;

let requestPromise = require("request-promise");
let WxSignature = require(rrdPath.MODEL_DIR +  "/wxsignature");
let WeChatConstant = require(rrdPath.CONSTANTS_DIR + "/wechat");

class WeChatAction {

    static _getAccessToken(){
        let requestOptions = {
            uri : "https://api.weixin.qq.com/cgi-bin/token",
            qs : {
                grant_type : "client_credential",
                appid : WeChatConstant.APPID,
                secret : WeChatConstant.APPSECRET
            },
            json : true
        };
        let accessTokenPromise = requestPromise(requestOptions);
        return accessTokenPromise;
    }
    static _getJsApiTicket(accessToken) {
        let requestOptions = {
            uri : "https://api.weixin.qq.com/cgi-bin/ticket/getticket",
            qs : {
                access_token : accessToken,
                type : "jsapi"
            },
            json : true
        };
        var jsApiTicketPromise = requestPromise(requestOptions);
        return jsApiTicketPromise;
    }
    static getSignaturePackage(url, cb){
        //TODO : 尝试使用generator改造
        let accessTokenPromise = WeChatAction._getAccessToken();
        accessTokenPromise
            .then( (accessTokenObj) => {
                let jsApiTicketPromise = WeChatAction._getJsApiTicket(accessTokenObj.access_token);
                return jsApiTicketPromise;
            })
            .then( (jsApiTicketObj) => {
                let jsApiTicket = jsApiTicketObj.ticket;
                let wxSignature = new WxSignature(WeChatConstant.APPID, jsApiTicket, url);
                let signaturePackage = wxSignature.getSignatureInfo();
                cb(null, signaturePackage);
            })
            .catch( (error) => {
                //console.log('发生错误！', error, error.stack);
                cb( error );
            });
    }
}

module.exports = WeChatAction
