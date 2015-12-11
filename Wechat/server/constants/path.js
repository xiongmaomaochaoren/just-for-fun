
/**
 * @author wangcheng
 * @data   2015-11-24
 * @desc   全部path变量
 */

'use strict';

const path = require('path');

const DS = '/';
const BASE_DIR = path.dirname(__dirname);
const LIB_DIR = BASE_DIR + DS + 'lib';
const ACTION_DIR = BASE_DIR + DS + 'actions';
const CONFIG_DIR = BASE_DIR + DS + 'config';
const MODEL_DIR = BASE_DIR + DS + 'models';
const ROUTER_DIR = BASE_DIR + DS + 'routers';
const CONSTANTS_DIR = BASE_DIR + DS + 'constants';

module.exports = {
    BASE_DIR,
    LIB_DIR,
    ACTION_DIR,
    CONFIG_DIR,
    MODEL_DIR,
    ROUTER_DIR,
    CONSTANTS_DIR
}
