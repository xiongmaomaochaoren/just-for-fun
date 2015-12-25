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

    signature(req, res, next){
        let referrerUrl = req.query.referrerUrl;
        WeChatAction._getSignaturePackage(referrerUrl, (err, signaturePackage) => {
            if( err ){
                return next(err);
            }
            res.weLog.info(signaturePackage);
            res.json(signaturePackage);
        });
    }

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

    static _getSignaturePackage(url, cb){
        //TODO : 使用async、await改造
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
                cb( error );
            });
    }
}

module.exports = WeChatAction
