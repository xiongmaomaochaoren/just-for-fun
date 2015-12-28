/**
 * 全局默认的错误处理中间件
 * Created by jess on 15/12/18.
 */


'use strict';


var rrd = global.rrd;
var errorFactory = rrd.errorFactory;

function rrdErrorMiddleware( conf ){

    return function( err, req, res, next ){

        var httpStatus = res.httpStatus || 500;
        var msg = err.showMessage || '服务器异常';

        res.weLog.error({err : err}, err.message);

        if( ! res.headersSent ){
            res.status( httpStatus );
        }

        //TODO 判断客户端是否请求JSON,如果是JSON,要返回JSON格式的数据
        let isRequestJSON = false;
        if( isRequestJSON ){
            return res.json({message : msg});
        }

        res.end(msg);

    };

}


module.exports = rrdErrorMiddleware;

