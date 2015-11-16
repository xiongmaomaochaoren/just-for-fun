// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';
import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export const devCreateStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

//注意export的写法 ： http://es6.ruanyifeng.com/#docs/module
//export { createStoreWithMiddleware };

export default createStoreWithMiddleware;
