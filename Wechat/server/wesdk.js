
'use strict';

var co = require("co");
var jsSHA = require("jssha");
var HttpUtil = require("./lib/HttpUtil.js");



function getAccessToken(){
    let accessUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
    let httpType = "https";
    var accessTokenPromise = HttpUtil.promiseGet(accessUrl, httpType);
    return accessTokenPromise;
}

function getJsApiTicket(accessToken) {
    let ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
    let httpType = "https";
    var jsApiTicketPromise = HttpUtil.promiseGet(ticketUrl, httpType);
    return jsApiTicketPromise;
}

function _getNonceStr(){
    return Math.random().toString(36).substr(2, 15);
}

function _getTimeStamp(){
    return parseInt( (new Date()).getTime() / 1000 ) + "";
}

function _getSignature(ticket, nonceStr, timestamp, url){
    let signatureStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    let shaObj = new jsSHA(signatureStr, "TEXT");
    return shaObj.getHash('SHA-1', 'HEX');
}

function getSignaturePackage(url, cb){

    /*
    co(function *(){
        console.log(url);
        let timestamp = _getTimeStamp();
        let nonceStr = _getNonceStr();
        let accessObj = yield getAccessToken();
        let jsApiTicketObj = yield getJsApiTicket(accessObj.access_token);
        let signature = _getSignature(jsApiTicketObj.ticket, nonceStr, timestamp, url);
        let signPackage = {
            appId : APPID,
            timestamp : timestamp,
            nonceStr : nonceStr,
            signature : signature,
            jsApiList : []
        };
    });
    */

    let timestamp = _getTimeStamp();
    let nonceStr = _getNonceStr();
    let accessTokenPromise = getAccessToken();
    accessTokenPromise
        .then( (accessTokenObj) => {
            let jsApiTicketPromise = getJsApiTicket(accessTokenObj.access_token);
            return jsApiTicketPromise;
        })
        .then( (jsApiTicketObj) => {
            let signature = _getSignature(jsApiTicketObj.ticket, nonceStr, timestamp, url);
            let signaturePackage = {
                appId : APPID,
                timestamp : timestamp,
                nonceStr : nonceStr,
                signature : signature,
                jsApiList : [

                ]
            };
            cb(signaturePackage);
        })
        .catch( (error) => {
            console.log('发生错误！', error);
        });

}

let url = "http://www.we.com";
getSignaturePackage(url, (signaturePackage) => {
    console.log(signaturePackage);
});

module.export = { getSignaturePackage }
