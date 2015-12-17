/**
 * @author wangcheng
 * @data   2015-12-09
 * @desc   WeChat常量
 */

'use strict';

let rrdPath = rrd.path;

let express = require("express");
let WechatAction = require(rrdPath.ACTION_DIR + "/wechat");

const wxRouter = express.Router();

wxRouter.get("/signature", function(req, res, next){
    let referrerUrl = req.query.referrerUrl;
    WechatAction.getSignaturePackage(referrerUrl, (err, signaturePackage) => {
        if( err ){
            return next(err);
        }
        res.set({
			"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET",
            "Access-Control-Allow-Credentials": "true"
		});
        //console.log(signaturePackage);
        //res.weLog.warn( {'signaturePackage' : signaturePackage });
        res.weLog.info('测试错误error输出');
		res.json(signaturePackage);
    });
});

module.exports = wxRouter;
