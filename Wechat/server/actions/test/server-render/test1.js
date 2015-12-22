/**
 * 测试react的服务器渲染
 * Created by jess on 15/12/21.
 */

'use strict';

const COMPONENT_DIR = global.rrd.path.ISOMORPHIC_COMPONENT_DIR;

import React from 'react';
import { renderToString } from 'react-dom/server';

let createStoreWithMiddleware = require( `${COMPONENT_DIR}/todo/store/middlewareStore` ).default;
let App = require( `${COMPONENT_DIR}/todo/containers/App` ).default;
import { Provider } from "react-redux";
var todoReduce =  require(`${COMPONENT_DIR}/todo/reduces/reduces`).default;

class Test1 {

    list(req, res, next ){

        let store = createStoreWithMiddleware( todoReduce, {} );

        let str = renderToString(
            <Provider store={store}>
                <App />
            </Provider>
        );

        res.render('redux-todo/redux-todo.html', {
            name : 'swig tpl',
            content : str
        });
    }

}


module.exports = Test1;
