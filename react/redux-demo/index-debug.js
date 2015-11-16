// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import createStoreWithMiddleware, {devCreateStoreWithMiddleware} from "./store/middlewareStore";
import { Provider } from "react-redux";
import todoReduce from "./reduces/reduces";

// let store = createStoreWithMiddleware(todoReduce);
let store = devCreateStoreWithMiddleware(todoReduce);
let rootDom = document.getElementById("redux-container");

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>,
    rootDom
);
