/**
 * Created by wangcheng on 15/12/17.
 */

'use strict';

let fs = require('fs');

let rrdPath = rrd.path;


class TodoAction {
    list(req, res, next){
        let todoListFile = rrdPath.TEST_DIR + '/todo/list.json';
        try{
            let listContent = fs.readFileSync(todoListFile, {
                charset : 'utf8'
            });
            let contentJson = JSON.parse(listContent);
            res.json(contentJson);
        }catch(error){
            res.weLog.error(error);
        }
    }
}

module.exports = TodoAction;