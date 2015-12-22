/**
 * 测试react的服务器渲染
 * Created by jess on 15/12/21.
 */

'use strict';

const COMPONENT_DIR = global.rrd.path.ISOMORPHIC_COMPONENT_DIR;

import { renderToString } from 'react-dom/server';

let createStoreWithMiddleware = require( `${COMPONENT_DIR}/todo/store/middlewareStore` );
let App = require( `${COMPONENT_DIR}/todo/containers/App` );
import { Provider } from "react-redux";
var todoReduce =  require(`${COMPONENT_DIR}/todo/reduces/reduces`);

class Test1 {

    list(req, res, next ){

        //let store = createStoreWithMiddleware( todoReduce, {} );

        let str = renderToString(
            <div>
                <TodoContainer />
                <CalContainer />
            </div>
        );

        res.render('test1/index.html', {
            name : 'swig tpl',
            content : str
        });
    }

}


module.exports = Test1;
