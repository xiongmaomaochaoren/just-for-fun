/**
 * Created by wangcheng on 15/12/17.
 */

'use strict';

let rrdPath = rrd.path;

const express = require('express');
const TodoAction = require(rrdPath.ACTION_DIR + '/todo');

const todoRouter = express.Router();

todoRouter.get('/list', function(res, req, next){

});