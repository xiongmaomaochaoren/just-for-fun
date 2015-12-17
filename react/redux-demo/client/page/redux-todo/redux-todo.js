import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "../../components/todo/containers/App";
import createStoreWithMiddleware from "../../components/todo/store/middlewareStore";
import { Provider } from "react-redux";
import todoReduce from "../../components/todo/reduces/reduces";

let store = createStoreWithMiddleware(todoReduce);
let rootDom = document.getElementById("redux-container");

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    rootDom
);
