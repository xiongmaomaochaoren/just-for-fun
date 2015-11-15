import {combineReducers} from "redux";
import {todoReduce, todoFilterReduce} from "./todos";

const todoAppReduce = combineReducers({todoReduce, todoFilterReduce});

export default todoAppReduce;
