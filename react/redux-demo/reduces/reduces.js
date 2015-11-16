import {combineReducers} from "redux";
import {todoReduce, todoFilterReduce} from "./todos";

//TODO : 增加自定义combineReducers方案  http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html

const todoAppReduce = combineReducers({
    todos : todoReduce,
    showFilter : todoFilterReduce
});

export default todoAppReduce;
