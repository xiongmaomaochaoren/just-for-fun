/**
 * Created by wangcheng on 15/12/17.
 */

'use strict';

let rrdPath = rrd.path;

const express = require('express');
const todoRouter = express.Router();

const TodoAction = require(rrdPath.ACTION_DIR + '/todo');
const todoAction = new TodoAction();


todoRouter.get('/list', function(res, req, next){
    todoAction.list(res, req, next);
});

module.exports = todoRouter;