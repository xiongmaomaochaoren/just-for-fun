import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todoReduce from "./reduces/reduces";

let store = createStore(todoReduce);
let rootDom = document.getElementById("redux-container");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootDom
);
