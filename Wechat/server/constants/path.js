
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
const TEST_DIR = BASE_DIR + DS + 'test';
//模板路径
const VIEW_DIR = BASE_DIR + DS + 'views';
//开发的模板路径
const DEV_VIEW_DIR = BASE_DIR + DS + '..' + DS + 'prebuild' + DS + 'views';
//前后端通用代码的目录
const ISOMORPHIC_DIR = path.dirname( BASE_DIR ) + DS + 'isomorphic';
//前后端通用的组件代码目录
const ISOMORPHIC_COMPONENT_DIR = ISOMORPHIC_DIR + DS + 'components';

module.exports = {
    BASE_DIR,
    LIB_DIR,
    ACTION_DIR,
    CONFIG_DIR,
    MODEL_DIR,
    ROUTER_DIR,
    CONSTANTS_DIR,
    TEST_DIR,
    VIEW_DIR,
    DEV_VIEW_DIR,
    ISOMORPHIC_COMPONENT_DIR
}
