/**
 * @author wangcheng
 * @data   2015-12-09
 * @desc   WeChat常量
 */

'use strict';

const APPID = "wx528f6e9d4ed5a954";
const APPSECRET = "bd5e0ec192d523237160e6db10d0af5b";
const JS_API_LIST = [
    'checkJSApi',
    'onMenuShareTimeline',
    'onMenuShareQQ',
    'onMenuShareAppMessage',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
];

module.exports = {
    APPID,
    APPSECRET,
    JS_API_LIST
}
