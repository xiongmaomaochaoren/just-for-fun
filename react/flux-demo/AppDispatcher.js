
import Flux from "flux";

/**
 * AppDispatcher会触发所有通过它注册过回调的Store，和传统的事件中心并不一样
 */
let AppDispatcher = new Flux.Dispatcher();
module.exports = AppDispatcher;
